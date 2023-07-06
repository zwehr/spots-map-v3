import MapAndListContainer from '@/components/map/MapAndListContainer';
import getSpotInBounds from '@/lib/fetch/getSpotInBounds';

export default async function Map() {
  const initialBounds = {
    north: 40.75928942746383,
    south: 40.660005201807856,
    east: -73.87070912078184,
    west: -74.09043568328184,
  };

  const spotsData: Promise<Spot[] | undefined> = getSpotInBounds(
    initialBounds.north,
    initialBounds.south,
    initialBounds.east,
    initialBounds.west
  );
  const spots = await spotsData;

  return (
    <div>
      <h1 className='hidden'>Skate Spots Map</h1>
      <MapAndListContainer spots={spots} />
    </div>
  );
}
