import LinkTags from '@/components/tags/LinkTags';
import getSpotsByTag from '@/lib/fetch/getSpotsByTag';
import Link from 'next/link';

export default async function SpotsListByTag({
  params,
}: {
  params: { tag: string };
}) {
  const spotsData: Promise<Spot[] | undefined> = getSpotsByTag(
    decodeURI(params.tag)
  );
  const spots = await spotsData;

  return (
    <>
      <h1>Spots List</h1>
      <h2>Tag: {decodeURI(params.tag)}</h2>
      <table className='max-w-6xl mx-auto'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Tags</th>
            <th>Added</th>
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
                <td>
                  <LinkTags tags={spot.tags} />
                </td>
                <td>{new Date(spot.createdAt).toLocaleDateString('en-US')}</td>
                <td>
                  <Link
                    href={`../spot/${spot._id}`}
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
