'use client';

import { useEffect, useState, useRef } from 'react';
import { Database } from '../../../../types/supabase';
import supabase from '@/lib/utils/supabase';
import { ClipLoader } from 'react-spinners';

export default function VideosList() {
  type Video = Database['public']['Tables']['videos']['Row'];

  const [videos, setVideos] = useState<Video[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getRangeBounds = (currentPage: number) => {
    const ITEMS_PER_PAGE = 5;
    let from = page * ITEMS_PER_PAGE;
    let to = from + ITEMS_PER_PAGE;

    if (page > 0) {
      from += 1;
    }
    console.log(`inside getRangeBounds, from is ${from} and to is ${to}`);
    return { from, to };
  };

  const getVideos = async () => {
    try {
      const { from, to } = getRangeBounds(page);
      console.log(`inside getVideos, from is ${from} and to is ${to}`);
      const { data, error } = await supabase
        .from('videos')
        .select()
        .range(from, to);
      setPage((prevPage) => prevPage + 1);
      if (data) {
        console.log(data);
        setVideos((prevVideos) => [...prevVideos, ...data]);
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
        <button
          className='bg-green-500 uppercase mx-auto p-2 rounded-md'
          onClick={getVideos}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
