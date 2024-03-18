'use client';

import { navigateMapLatLng } from './actions';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { FaSearchLocation } from 'react-icons/fa';
import Link from 'next/link';
import NumberCountUp from '../animation/NumberCountUp';
import { merriweather } from '@/app/fonts';

export default function BrowseOptionsWindow() {
  const handleUserLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        userLocationSuccess,
        userLocationError
      );
    }
  };

  const userLocationSuccess = (position: GeolocationPosition) => {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;
    console.log(userLat, userLng);
    navigateMapLatLng(userLat, userLng);
  };

  const userLocationError = () => console.log('Unable to retrieve location');

  return (
    <div className='absolute w-96 mx-auto mt-24 left-0 right-0 bg-blur-md bg-white/95 rounded-lg text-center z-10'>
      <div className='w-full flex flex-col'>
        <h2 className={`mt-6 mb-4 ${merriweather.className}`}>
          <NumberCountUp count={123} /> Spots and Counting...
        </h2>

        <button
          className='uppercase text-lg text-gray-100 transition ease-in-out delay-100 duration-300 bg-emerald-600 hover:bg-emerald-700 rounded-md py-2 px-6 mt-3 mx-auto'
          onClick={handleUserLocationClick}
        >
          <div className='flex flex-row items-center'>
            <FaLocationCrosshairs className='mr-1' />
            <p>Browse Map Near Me</p>
          </div>
        </button>

        <p className={`my-1 font-bold ${merriweather.className}`}>or</p>
        <Link href='/search/skate-spots'>
          <button className='uppercase text-lg text-gray-100 transition ease-in-out delay-100 duration-300 bg-blue-600 hover:bg-blue-800 rounded-md py-2 px-6 mb-6 mx-auto'>
            <div className='flex flex-row items-center'>
              <FaSearchLocation className='mr-1' />
              <p>Search and Filter</p>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}
