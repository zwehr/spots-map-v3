'use client';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Dispatch, SetStateAction, useCallback } from 'react';
import GoogleMapFull from '@/components/map/GoogleMapFull';

type GoogleMapContainerProps = {
  spots: Spot[] | undefined;
  setSelectedSpot: Dispatch<SetStateAction<string>>;
};

const options = {};
const center = { lat: 20, lng: -50 };

export default function GoogleMapContainer({
  spots,
  setSelectedSpot,
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
    />
  );
}
