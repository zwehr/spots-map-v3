import LinkTags from '@/components/tags/LinkTags';
import getAllSpots from '@/lib/fetch/getAllSpots';
import Link from 'next/link';

export default async function SpotsList() {
  const spotsData: Promise<Spot[] | undefined> = getAllSpots();
  const spots = await spotsData;

  return (
    <>
      <h1>Spots List</h1>
      <table className='max-w-6xl mt-6 mx-auto'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>City</th>
            <th>Tags</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {spots &&
            spots.map((spot) => (
              <tr key={spot._id}>
                <td className='font-semibold'>{spot.name}</td>
                <td>{spot.description}</td>
                <td>{spot.type[0].toUpperCase() + spot.type.slice(1)}</td>
                <td>{spot.city}</td>
                <td>
                  <LinkTags tags={spot.tags} />
                </td>
                <td>
                  <Link
                    href={`/spot/${spot._id}`}
                    className='link font-semibold'
                  >
                    More Info
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
