import LinkTags from '@/components/tags/LinkTags';
import getSpotsByTag from '@/lib/fetch/getSpotsByTag';
import Link from 'next/link';
import { RiCloseCircleFill } from 'react-icons/ri';

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
      {spots && spots.length > 0 ? (
        <>
          <h2>
            {spots?.length} {spots.length > 1 ? 'spots' : 'spot'} found matching
            tag:{' '}
            <span className='underline decoration-emerald-400'>
              {decodeURI(params.tag)}
            </span>
            <Link href='/list/skate-spots'>
              <button className='align-middle ml-1' title='Clear tag'>
                <RiCloseCircleFill className='text-red-500 hover:text-red-600' />
              </button>
            </Link>
          </h2>
          <table className='max-w-6xl mx-auto mt-6'>
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
                      <LinkTags
                        tags={spot.tags}
                        selectedTag={decodeURI(params.tag)}
                      />
                    </td>
                    <td>
                      {new Date(spot.createdAt).toLocaleDateString('en-US')}
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
      ) : (
        <h2>No spots matching tag: {params.tag}</h2>
      )}
    </>
  );
}
