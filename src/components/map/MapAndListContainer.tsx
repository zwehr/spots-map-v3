'use client';

import MapList from '@/components/map/MapList';
import GoogleMapContainer from '@/components/map/GoogleMapContainer';
import { useEffect, useState } from 'react';

type MapAndListContainerProps = {
  spots: Spot[] | undefined;
};

export default function MapAndListContainer({
  spots,
}: MapAndListContainerProps) {
  const [selectedSpot, setSelectedSpot] = useState('');
  const [currentSpots, setCurrentSpots] = useState<Spot[] | undefined>([]);

  useEffect(() => {
    setCurrentSpots(spots);
  }, [spots]);

  const handleFindNewSpots = async (
    northBoundary: number,
    southBoundary: number,
    eastBoundary: number,
    westBoundary: number
  ) => {
    try {
      const response = await fetch(
        `/api/spots/${northBoundary}/${southBoundary}/${eastBoundary}/${westBoundary}`,
        {
          method: 'GET',
        }
      );
      const newSpots = await response.json();
      console.log('new spots: ', newSpots);
      setCurrentSpots(newSpots);
    } catch (e) {
      console.log(e);
    }
  };

  const heightMinusNavStyle = {
    height: 'calc(100vh - 60px)',
  };

  return (
    <div
      style={heightMinusNavStyle}
      className='flex w-screen flex-col-reverse lg:flex-row'
    >
      <div className='lg:w-1/3'>
        <MapList spots={currentSpots} selectedSpot={selectedSpot} />
      </div>
      <div className='lg:w-2/3'>
        <GoogleMapContainer
          spots={currentSpots}
          setSelectedSpot={setSelectedSpot}
          handleFindNewSpots={handleFindNewSpots}
        />
      </div>
    </div>
  );
}
