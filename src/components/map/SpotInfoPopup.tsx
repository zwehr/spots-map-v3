import { Database } from '../../../types/supabase';
import { IoMdCloseCircle } from 'react-icons/io';
import { BeatLoader } from 'react-spinners';
import LinkTags from '../tags/LinkTags';
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
      className={`spot-info-popup bg-gray-100 shadow-md rounded-lg w-96 absolute top-6 right-6 z-50 ${
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
            <p className='text-red-500 text-xl text-center my-8'>
              [More Later]
            </p>

            <Link href={`/spot/${spot.id}`}>
              <div className='w-full my-2 px-2 py-1 bg-green-400 uppercase rounded hover:bg-green-500'>
                View Detailed Spot Info
              </div>
            </Link>
            <Link
              href={`/search/skate-spots?query=${spot.type}&city=${spot.city}`}
            >
              <div className='w-full my-2 px-2 py-1 bg-blue-800 text-gray-100 uppercase rounded hover:bg-blue-900'>
                More <span className='font-mono'>[{spot.type}]</span> spots in{' '}
                <span className='font-mono'>[{spot.city}]</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
