'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Database } from '../../../types/supabase';

type Spot = Database['public']['Tables']['spots']['Row'];

type MapListProps = {
  spots: Spot[] | null;
  mapOptions: {
    zoomLevel: number;
    lat: number;
    lng: number;
  };
};

export default function MapMain({ spots, mapOptions }: MapListProps) {
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  return (
    <div className='h-full w-full bg-gray-100 relative'>
      <MapContainer
        center={[mapOptions.lat, mapOptions.lng]}
        zoom={mapOptions.zoomLevel}
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
                  setSelectedSpot(spot);
                },
              }}
            ></Marker>
          ))}
      </MapContainer>
    </div>
  );
}
