'use client';

import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Database } from '../../../types/supabase';

type SingleSpotMapProps = {
  lat: Database['public']['Tables']['spots']['Row']['lat'];
  lng: Database['public']['Tables']['spots']['Row']['lng'];
};

export default function SingleSpotMap({ lat, lng }: SingleSpotMapProps) {
  const [center, setCenter] = useState({ lat, lng });
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();

  return (
    <div className='container w-1/3 h-1/2'>
      <MapContainer
        center={[lat!, lng!]}
        zoom={ZOOM_LEVEL}
        style={{ width: '50vh', height: '50vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[lat!, lng!]} />
      </MapContainer>
    </div>
  );
}
