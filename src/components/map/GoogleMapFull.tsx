'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

type GoogleMapProps = {
  spots: Spot[] | undefined;
};

export default function GoogleMapFull({ spots }: GoogleMapProps) {
  const handleMarkerClick = (spotName: string) => {
    alert(spotName);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
      <GoogleMap
        //mapContainerStyle={}
        center={{
          lat: 40.7231,
          lng: -73.9913,
        }}
        zoom={13}
        mapContainerClassName='w-full h-full'
      >
        {/* Child components, such as markers, info windows, etc. */}
        {spots &&
          spots.map((spot) => (
            <Marker
              position={{ lat: spot.lat, lng: spot.lng }}
              onClick={() => handleMarkerClick(spot.name)}
              key={spot._id}
            />
          ))}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}