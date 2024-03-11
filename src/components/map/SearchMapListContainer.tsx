'use client';

import MapFilterList from '@/components/list/MapFilterList';
import { Database } from '../../../types/supabase';
import { useState } from 'react';
import { merriweather } from '@/app/fonts';
import { findSpotsByCityAndTag } from './actions';
import dynamic from 'next/dynamic';

const MapFilter = dynamic(() => import('../../components/map/MapFilter'), {
  ssr: false,
});

export default function SearchMapListContainer() {
  type Spot = Database['public']['Tables']['spots']['Row'];

  const [data, setData] = useState<Spot[] | null>(null);
  const [mapOptions, setMapOptions] = useState({
    zoomLevel: 2,
    lat: 26.873453247341224,
    lng: -38.29011797802427,
  });
  const [cityQuery, setCityQuery] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showErrorMsg, setShowErroMsg] = useState<boolean>(false);

  const handleSearch = async () => {
    if (cityQuery !== '' && searchQuery !== '') {
      setShowErroMsg(false);
      const newSpots = await findSpotsByCityAndTag(
        cityQuery.trim().toLowerCase(),
        searchQuery.trim().toLowerCase()
      );
      console.log(newSpots);
      setData(newSpots);
    } else {
      setShowErroMsg(true);
    }
  };

  return (
    <>
      <div className={'w-96 p-4 bg-gray-100 mx-auto text-center rounded'}>
        <div>
          <div className='flex my-2'>
            <p className={merriweather.className}>City:</p>
            <input
              type='text'
              className={`w-1/2 ml-2 px-1 ${merriweather.className}`}
              placeholder='e.g. "Los Angeles"'
              value={cityQuery}
              onChange={(e) => setCityQuery(e.target.value)}
            />
          </div>
          <div className='flex my-2'>
            <p className={merriweather.className}>Search term:</p>
            <input
              type='text'
              className={`w-1/2 ml-2 px-1 ${merriweather.className}`}
              placeholder='e.g. "out ledge"'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className='h-4'>
          <p className={!showErrorMsg ? 'hidden' : 'text-red-500'}>
            Enter city and search term
          </p>
        </div>
        <button
          onClick={handleSearch}
          className='w-1/3 mx-auto my-2 px-4 py-2 bg-green-500 hover:bg-green-600 hover:text-gray-100 block rounded uppercase'
        >
          Search
        </button>
      </div>
      <div className='flex'>
        <div className='w-1/2 min-h-96 p-4 bg-gray-100 rounded-md m-4'>
          <MapFilterList spots={data} />
        </div>
        <div className='w-1/2 h-96 bg-gray-100 m-4 rounded'>
          <MapFilter spots={data} mapOptions={mapOptions} />
        </div>
      </div>
    </>
  );
}
