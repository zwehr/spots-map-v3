import AdminSpotsList from '@/components/tables/AdminSpotsTable';
import LinkTags from '@/components/tags/LinkTags';
import getAllSpots from '@/lib/fetch/getAllSpots';

export default async function AdminSpotsListContainer() {
  const spotsData: Promise<Spot[] | undefined> = getAllSpots();
  const spots = await spotsData;

  return (
    <>
      <h1>Admin Spots List</h1>
      <AdminSpotsList spots={spots} />
    </>
  );
}
