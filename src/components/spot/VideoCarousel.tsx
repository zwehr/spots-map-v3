'use client';

import { useState } from 'react';
import { GrPrevious, GrNext } from 'react-icons/gr';

type VideoProps = {
  youtubeLinks: Array<string>;
};

export default function VideoCarousel({ youtubeLinks }: VideoProps) {
  const [youtubeLinkIndex, setYoutubeLinkIndex] = useState(0);

  // Takes total seconds from end of YouTube link (after '='), converts to number, and takes floor of division by 60 (seconds)
  let currTimeStampMinute = Math.floor(
    parseInt(youtubeLinks[youtubeLinkIndex].split('=')[1]) / 60
  );

  // Similar to above, but % operator gives seconds
  let currTimeStampSeconds =
    parseInt(youtubeLinks[youtubeLinkIndex].split('=')[1]) % 60;

  const handlePreviousVideoClick = () => {
    if (youtubeLinkIndex === 0) {
      setYoutubeLinkIndex(youtubeLinks.length - 1);
    } else {
      setYoutubeLinkIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextVideoClick = () => {
    if (youtubeLinkIndex === youtubeLinks.length - 1) {
      setYoutubeLinkIndex(0);
    } else {
      setYoutubeLinkIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className='flex my-5 mx-auto'>
      <div>
        <button
          className='mt-36 p-1 text-4xl bg-slate-300 rounded-full shadow-xl hover:bg-slate-400'
          onClick={handlePreviousVideoClick}
        >
          <GrPrevious />
        </button>
      </div>
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
          Spot Timestamp: {currTimeStampMinute}:
          {/* If timestamp seconds is less than ten, we need to manually add a 0 (e.g. 5:02) */}
          {currTimeStampSeconds < 10 && '0'}
          {currTimeStampSeconds}
        </p>
        <p></p>
      </div>
      <div>
        <button
          className='mt-36 p-1 text-4xl bg-slate-300 rounded-full shadow-xl hover:bg-slate-400'
          onClick={handleNextVideoClick}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
}
