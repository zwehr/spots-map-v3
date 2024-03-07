'use client';

import SpotInfoPopup from './SpotInfoPopup';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Database } from '../../../types/supabase';

type Spot = Database['public']['Tables']['spots']['Row'];

type MapListProps = {
  spots: Spot[] | undefined;
};

export default function MapMain({ spots }: MapListProps) {
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [showSpotInfoPopup, setShowSpotInfoPopup] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const ZOOM_LEVEL = 6;
  const positionLat = 51.505;
  const positionLng = -0.09;

  return (
    <div className='h-full w-full bg-gray-100 relative'>
      <MapContainer
        center={[positionLat, positionLng]}
        zoom={ZOOM_LEVEL}
        style={{ width: '100%', height: '100%', zIndex: '40' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {spots &&
          spots.map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.lat!, spot.lng!]}
              eventHandlers={{
                click: () => {
                  console.log(spot.name);
                  setImageLoaded(false);
                  setSelectedSpot(spot);
                  setShowSpotInfoPopup(true);
                },
              }}
            ></Marker>
          ))}
      </MapContainer>
      <SpotInfoPopup
        spot={selectedSpot}
        showSpotInfoPopup={showSpotInfoPopup}
        setShowSpotInfoPopup={setShowSpotInfoPopup}
        setImageLoaded={setImageLoaded}
        imageLoaded={imageLoaded}
      />
    </div>
  );
}
