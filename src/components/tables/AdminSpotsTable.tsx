'use client';

import LinkTags from '@/components/tags/LinkTags';
import getAllSpots from '@/lib/fetch/getAllSpots';

type AdminSpotsTableProps = {
  spots: Spot[] | undefined;
};

export default async function AdminSpotsTable(props: AdminSpotsTableProps) {
  return (
    <>
      {' '}
      <table className='max-w-7xl mx-auto text-sm'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>City</th>
            <th>$$$</th>
            <th>Clips</th>
            <th>Add Clip</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <p className='text-center mt-4 text-red-500 text-xl'>
        [Removed Description from spots db table, so this needs to be updated to
        work properly.]
      </p>
    </>
  );
}
