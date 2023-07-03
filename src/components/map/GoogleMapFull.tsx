import { Dispatch, SetStateAction } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

type GoogleMapFullProps = {
  spots: Spot[] | undefined;
  setSelectedSpot: Dispatch<SetStateAction<string>>;
  center: { lat: number; lng: number };
};

export default function GoogleMapFull({
  spots,
  setSelectedSpot,
  center,
}: GoogleMapFullProps) {
  const handleMarkerClick = (spotId: string) => {
    const matchingElement = document.getElementById(spotId);
    if (matchingElement) {
      matchingElement.scrollIntoView({ behavior: 'smooth' });
    }
    setSelectedSpot(spotId);
  };

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName='w-full h-full'>
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
