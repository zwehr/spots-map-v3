import MapAndListContainer from '@/components/map/MapAndListContainer';
import getAllSpots from '@/lib/fetch/getAllSpots';

export default async function Map() {
  const spotsData: Promise<Spot[] | undefined> = getAllSpots();
  const spots = await spotsData;

  return (
    <div>
      <h1 className='hidden'>Skate Spots Map</h1>
      <MapAndListContainer spots={spots} />
    </div>
  );
}
