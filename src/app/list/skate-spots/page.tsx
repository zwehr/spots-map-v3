import TableTags from '@/components/tags/TableTags';
import getAllSpots from '@/lib/fetch/getAllSpots';

export default async function SpotsList() {
  const spotsData: Promise<Spot[]> = getAllSpots();
  const spots = await spotsData;

  return (
    <>
      <h1>Spots List</h1>
      <table className='max-w-6xl mx-auto'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Tags</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {spots.map((spot) => (
            <tr key={spot._id}>
              <td>{spot.name}</td>
              <td>{spot.description}</td>
              <td>{spot.type[0].toUpperCase() + spot.type.slice(1)}</td>
              <td>
                <TableTags tags={spot.tags} />
              </td>
              <td>{new Date(spot.createdAt).toLocaleDateString('en-US')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
