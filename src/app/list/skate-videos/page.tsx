'use client';

import { useEffect, useState, useRef } from 'react';
import { Database } from '../../../../types/supabase';
import supabase from '@/lib/utils/supabase';
import { ClipLoader } from 'react-spinners';

export default function VideosList() {
  type Video = Database['public']['Tables']['videos']['Row'];

  const [videos, setVideos] = useState<Video[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isInitialFetchComplete, setIsInitialFetchComplete] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getRangeBounds = (currentPage: number) => {
    const ITEMS_PER_PAGE = 20;
    let from = page * ITEMS_PER_PAGE;
    let to = from + ITEMS_PER_PAGE;

    if (page > 0) {
      from += 1;
    }
    console.log(`inside getRangeBounds, from is ${from} and to is ${to}`);
    return { from, to };
  };

  const getVideos = async () => {
    setIsLoading(true);
    try {
      const { from, to } = getRangeBounds(page);
      console.log(`inside getVideos, from is ${from} and to is ${to}`);
      const { data, error } = await supabase
        .from('videos')
        .select()
        .range(from, to)
        .order('created_at', { ascending: false });
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
    setIsLoading(false);
  };

  useEffect(() => {
    getVideos();
    setIsInitialFetchComplete(true);
  }, []);

  return (
    <div>
      <h1 className='uppercase'>Videos</h1>
      <div className='max-w-3xl mx-auto mb-24'>
        {videos &&
          videos.map((video) => (
            <div
              key={video.id}
              className='bg-gray-200 rounded p-4 m-4 shadow-md flex relative'
            >
              <div className='w-1/4'>
                <img
                  src={
                    video.thumbnail_image_url ? video.thumbnail_image_url : ''
                  }
                />
              </div>
              <div className='w-3/4 pl-2'>
                <h2 className='text-xl text-left'>{video.title}</h2>
                <div className='flex'>
                  <p>
                    {video.company} - {video.release_year}
                  </p>
                </div>
              </div>
              <div className='absolute bottom-0 right-2'>
                <a href={'skate-videos/' + video.id} className='link'>
                  More Info
                </a>
              </div>
            </div>
          ))}
        <div className='w-36 mx-auto'>
          {!isLoading && isInitialFetchComplete ? (
            <button
              className='bg-green-400 text-xl uppercase w-full mx-auto mt-2 p-2 rounded-md shadow-lg hover:bg-green-500'
              onClick={getVideos}
            >
              Load More
            </button>
          ) : (
            <div className='mx-auto text-center'>
              <ClipLoader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
