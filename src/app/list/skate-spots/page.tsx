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
        <tbody></tbody>
      </table>
      <p className='text-xl text-red-500 text-center mt-12'>
        [Description removed from spots, other fields added... will be updated
        later]
      </p>
    </>
  );
}
