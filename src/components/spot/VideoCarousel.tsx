'use client';

import youtubeToTimestamp from '@/lib/misc-helper/youtubeToTimestamp';
import { useState } from 'react';
import { Database } from '../../../types/supabase';
import { GrPrevious, GrNext } from 'react-icons/gr';

type VideoProps = Database['public']['Tables']['spots']['Row']['youtube_links'];

export default function VideoCarousel({
  youtubeLinks,
}: {
  youtubeLinks: VideoProps;
}) {
  const [youtubeLinkIndex, setYoutubeLinkIndex] = useState(0);

  const handlePreviousVideoClick = () => {
    if (youtubeLinks && youtubeLinkIndex === 0) {
      setYoutubeLinkIndex(youtubeLinks.length - 1);
    } else {
      setYoutubeLinkIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextVideoClick = () => {
    if (youtubeLinks && youtubeLinkIndex === youtubeLinks.length - 1) {
      setYoutubeLinkIndex(0);
    } else {
      setYoutubeLinkIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (youtubeLinks) {
    if (youtubeLinks.length === 0) {
      return (
        <p className='text-center font-semibold'>[No youtube links found.]</p>
      );
    } else if (
      youtubeLinks &&
      !youtubeLinks[youtubeLinkIndex].includes('start=')
    ) {
      return (
        <p className='text-center font-semibold'>[YouTube link(s) invalid.]</p>
      );
    } else
      return (
        <div className='flex my-5 mx-auto'>
          {youtubeLinks.length > 1 && (
            <div>
              <button
                className='mt-36 p-1 text-4xl rounded-full shadow-lg bg-slate-100 hover:bg-slate-200'
                onClick={handlePreviousVideoClick}
              >
                <GrPrevious />
              </button>
            </div>
          )}
          <div className='w-[550px] mx-auto text-center'>
            <iframe
              /* Default width and height are 560 and 315 respectively. */
              width='550'
              height='315'
              src={youtubeLinks[youtubeLinkIndex]}
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>
            <p>{`Video ${youtubeLinkIndex + 1}/${youtubeLinks.length}`}</p>
            <p>
              Spot Timestamp:{' '}
              {youtubeToTimestamp(youtubeLinks[youtubeLinkIndex])}
            </p>
            <p></p>
          </div>
          {youtubeLinks.length > 1 && (
            <div>
              <button
                className='mt-36 p-1 text-4xl rounded-full shadow-lg bg-slate-100 hover:bg-slate-200'
                onClick={handleNextVideoClick}
              >
                <GrNext />
              </button>
            </div>
          )}
        </div>
      );
  }
}
