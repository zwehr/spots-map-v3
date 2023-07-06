'use client';

import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import FindSpotsButton from './FindSpotsButton';

type GoogleMapFullProps = {
  spots: Spot[] | undefined;
  setSelectedSpot: Dispatch<SetStateAction<string>>;
  center: { lat: number; lng: number };
  handleFindNewSpots: (
    northBoundary: number,
    southBoundary: number,
    eastBoundary: number,
    westBoundary: number
  ) => void;
};

export default function GoogleMapFull({
  spots,
  setSelectedSpot,
  center,
  handleFindNewSpots,
}: GoogleMapFullProps) {
  const [map, setMap] = useState<any>(null);
  const [currentBounds, setCurrentBounds] = useState({
    north: 1,
    south: 2,
    east: 3,
    west: 4,
  });

  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
    }
  }, [map]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const handleMarkerClick = (spotId: string) => {
    const matchingElement = document.getElementById(spotId);
    if (matchingElement) {
      matchingElement.scrollIntoView({ behavior: 'smooth' });
    }
    setSelectedSpot(spotId);
  };

  return (
    <GoogleMap
      zoom={3}
      center={center}
      mapContainerClassName='w-full h-full'
      onLoad={onLoad}
      onBoundsChanged={() => {
        if (map != null) {
          console.log('current boundaries: ', map.getBounds().toJSON());
          setCurrentBounds(map.getBounds().toJSON());
        }
      }}
    >
      <FindSpotsButton
        handleFindNewSpots={handleFindNewSpots}
        currentBounds={currentBounds}
      />
      {spots &&
        spots.map((spot) => (
          <Marker
            position={{ lat: spot.lat, lng: spot.lng }}
            onClick={() => handleMarkerClick(spot._id)}
            key={spot._id}
          />
        ))}
    </GoogleMap>
  );
}
