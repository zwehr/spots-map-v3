'use client';

import MapList from '@/components/map/MapList';
import GoogleMapFull from '@/components/map/GoogleMapFull';
import { useState } from 'react';

type MapAndListContainerProps = {
  spots: Spot[] | undefined;
};

export default function MapAndListContainer({
  spots,
}: MapAndListContainerProps) {
  const [selectedSpot, setSelectedSpot] = useState('');

  const heightMinusNavStyle = {
    height: 'calc(100vh - 60px)',
  };

  return (
    <div
      style={heightMinusNavStyle}
      className='flex w-screen flex-col-reverse lg:flex-row'
    >
      <div className='lg:w-1/3'>
        <MapList spots={spots} selectedSpot={selectedSpot} />
      </div>
      <div className='lg:w-2/3'>
        <GoogleMapFull spots={spots} setSelectedSpot={setSelectedSpot} />
      </div>
    </div>
  );
}
