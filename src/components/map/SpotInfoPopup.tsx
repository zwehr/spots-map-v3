import { Database } from '../../../types/supabase';
import { IoMdCloseCircle } from 'react-icons/io';
import { BeatLoader } from 'react-spinners';
import LinkTags from '../tags/LinkTags';
import { useState } from 'react';
import Link from 'next/link';

type Spot = Database['public']['Tables']['spots']['Row'];

type SpotInfoPopupProps = {
  spot: Spot | null;
  showSpotInfoPopup: boolean;
  setShowSpotInfoPopup: (arg0: boolean) => void;
  imageLoaded: boolean;
  setImageLoaded: (arg0: boolean) => void;
};

export default function SpotInfoPopup({
  spot,
  showSpotInfoPopup,
  setShowSpotInfoPopup,
  imageLoaded,
  setImageLoaded,
}: SpotInfoPopupProps) {
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className={`spot-info-popup bg-gray-100 shadow-md rounded-lg w-96 h-5/6 absolute top-6 right-6 z-50 ${
        showSpotInfoPopup ? '' : 'hidden'
      }`}
    >
      <div className='flex flex-col'>
        <div
          className='text-2xl text-red-500 ml-auto mt-2 mr-2 hover:text-red-600 hover:cursor-pointer'
          onClick={() => setShowSpotInfoPopup(false)}
        >
          <IoMdCloseCircle />
        </div>
        {spot && (
          <div className='p-4'>
            <h2>{spot.name}</h2>
            <div className={`relative ${imageLoaded ? '' : 'hidden'}`}>
              {!imageLoaded && (
                <div className='w-full'>
                  <p>
                    <BeatLoader />
                  </p>
                </div>
              )}
              <img
                src={spot.image_links ? spot.image_links[0] : 'backupImage'}
                alt='selected skate spot photo'
                className='p-4'
                onLoad={handleImageLoad}
              />
              <div className='absolute top-6 left-6 bg-gray-200 rounded-sm py-1 px-2'>
                <p>{spot.city}</p>
              </div>
            </div>
            <LinkTags tags={spot.tags} />
            <p className='text-red-500 text-xl text-center mt-10'>
              [More Later]
            </p>
            <p className='text-center'>
              <Link
                href={`/spot/${spot.id}`}
                className='link text-xl text-center mt-10'
              >
                View All Spot Info
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
