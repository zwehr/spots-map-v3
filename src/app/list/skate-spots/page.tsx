import getAllSpots from '@/lib/fetch/getAllSpots';

export default async function SpotsList() {
  const spotsData: Promise<Spot[]> = getAllSpots();
  const spots = await spotsData;

  return (
    <>
      <h1>Spots List</h1>
      {spots.map((spot) => (
        <p>{spot.name}</p>
      ))}
    </>
  );
}
