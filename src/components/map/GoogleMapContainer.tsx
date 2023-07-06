'use client';

import { useLoadScript } from '@react-google-maps/api';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import GoogleMapFull from '@/components/map/GoogleMapFull';

type GoogleMapContainerProps = {
  spots: Spot[] | undefined;
  setSelectedSpot: Dispatch<SetStateAction<string>>;
  handleFindNewSpots: (
    northBoundary: number,
    southBoundary: number,
    eastBoundary: number,
    westBoundary: number
  ) => void;
};

const options = {};
const center = { lat: 20, lng: -50 };

export default function GoogleMapContainer({
  spots,
  setSelectedSpot,
  handleFindNewSpots,
}: GoogleMapContainerProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    // ...otherOptions
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMapFull
      spots={spots}
      setSelectedSpot={setSelectedSpot}
      center={center}
      handleFindNewSpots={handleFindNewSpots}
    />
  );
}
