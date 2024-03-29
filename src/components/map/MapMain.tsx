'use client';

import SpotInfoPopup from './SpotInfoPopup';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import { Database } from '../../../types/supabase';
import { useSearchParams } from 'next/navigation';

type Spot = Database['public']['Tables']['spots']['Row'];

type MapListProps = {
  spots: Spot[] | undefined;
};

export default function MapMain({ spots }: MapListProps) {
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [showSpotInfoPopup, setShowSpotInfoPopup] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const latParam = searchParams.get('lat');
  const lngParam = searchParams.get('lng');

  console.log('searchParams lat and lng:', latParam, lngParam);

  const positionLat = latParam ? parseFloat(latParam) : 35;
  const positionLng = lngParam ? parseFloat(lngParam) : -30;

  const zoomLevel = latParam && lngParam ? 11 : 3;

  const icon = L.icon({
    iconRetinaUrl: iconRetina.src,
    iconUrl: iconMarker.src,
    iconSize: [30, 45],
    iconAnchor: [15, 45],
  });

  return (
    <div className='h-full w-full bg-gray-100 relative'>
      <MapContainer
        center={[positionLat, positionLng]}
        zoom={zoomLevel}
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
              icon={icon}
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
