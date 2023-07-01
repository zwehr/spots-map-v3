'use client';

import { GoogleMap, LoadScript } from '@react-google-maps/api';

const center = {
  lat: -3.745,
  lng: -38.523,
};

export default function GoogleMapFull() {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}>
      <GoogleMap
        //mapContainerStyle={}
        center={center}
        zoom={10}
        mapContainerClassName='w-full h-full'
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}
