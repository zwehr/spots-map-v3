import LinkTags from '@/components/tags/LinkTags';
import supabase from '@/lib/utils/supabase';
import { Database } from '../../../../../../types/supabase';
import Link from 'next/link';
import { RiCloseCircleFill } from 'react-icons/ri';

export default async function SpotsListByTag({
  params,
}: {
  params: { tag: string };
}) {
  type Spot = Database['public']['Tables']['spots']['Row'];

  const tag = decodeURI(params.tag);

  const { data, error } = await supabase
    .from('spots')
    .select()
    .contains('tags', [tag]);

  if (error) {
    console.log(error);
  }

  const spots = data as Spot[];

  return (
    <>
      <h1>Spots List</h1>
      {spots && spots.length > 0 ? (
        <>
          <h2>
            {spots?.length} {spots.length > 1 ? 'spots' : 'spot'} found matching
            tag: <span className='underline decoration-emerald-400'>{tag}</span>
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
                <th>Type</th>
                <th>City</th>
                <th>Tags</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {spots &&
                spots.map((spot) => (
                  <tr key={spot.id}>
                    <td className='font-semibold'>{spot.name}</td>
                    <td>
                      {spot.type &&
                        spot.type[0].toUpperCase() + spot.type.slice(1)}
                    </td>
                    <td>{spot.city}</td>
                    <td>
                      <LinkTags tags={spot.tags} />
                    </td>
                    <td>
                      <Link
                        href={`/spot/${spot.id}`}
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
        <h2>No spots matching tag: {tag}</h2>
      )}
    </>
  );
}
