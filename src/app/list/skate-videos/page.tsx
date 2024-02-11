'use client';

import { useEffect, useState, useRef } from 'react';
import { Database } from '../../../../types/supabase';
import supabase from '@/lib/utils/supabase';
import { ClipLoader } from 'react-spinners';

export default function VideosList() {
  type Video = Database['public']['Tables']['videos']['Row'];

  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const rangeStartRef = useRef<number>(0);

  const getVideos = async () => {
    const rangeStart = rangeStartRef.current;

    try {
      const { data, error } = await supabase
        .from('videos')
        .select()
        .order('created_at', { ascending: false })
        .range(rangeStart, rangeStart + 25);

      if (data) {
        console.log(data);
        setVideos((prevVideos) => [...prevVideos, ...data]);
        rangeStartRef.current += 26;
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getVideos();

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        getVideos();
      }
    };

    // Add event listener when component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <h1 className='uppercase'>Videos</h1>
      <div className='max-w-3xl mx-auto mb-24'>
        {videos &&
          videos.map((video) => (
            <div
              key={video.id}
              className='bg-gray-200 rounded p-4 m-4 shadow-md'
            >
              <h2 className='text-left'>{video.title}</h2>
              <p className='pl-4 capitalize'>
                {video.release_year} {video.company}
              </p>
            </div>
          ))}
        <div className='text-center'>
          <ClipLoader />
        </div>
      </div>
    </div>
  );
}
