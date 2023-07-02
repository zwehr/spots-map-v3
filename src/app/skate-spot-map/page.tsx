import MapAndListContainer from '@/components/map/MapAndListContainer';
import getAllSpots from '@/lib/fetch/getAllSpots';

export default async function Map() {
  const spotsData: Promise<Spot[] | undefined> = getAllSpots();
  const spots = await spotsData;

  return (
    <div>
      <MapAndListContainer spots={spots} />
    </div>
  );
}
