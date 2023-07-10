'use client';

import LinkTags from '@/components/tags/LinkTags';
import getAllSpots from '@/lib/fetch/getAllSpots';

type AdminSpotsTableProps = {
  spots: Spot[] | undefined;
};

export default async function AdminSpotsTable(props: AdminSpotsTableProps) {
  return (
    <table className='max-w-7xl mx-auto text-sm'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Type</th>
          <th>City</th>
          <th>Tags</th>
          <th>$$$</th>
          <th>Clips</th>
          <th>Add Clip</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {props.spots &&
          props.spots.map((spot) => (
            <tr key={spot._id}>
              <td className='max-w-xs'>{spot.name}</td>
              <td className='max-w-2xl'>{spot.description}</td>
              <td>{spot.type[0].toUpperCase() + spot.type.slice(1)}</td>
              <td>{spot.city}</td>
              <td>
                <LinkTags tags={spot.tags} />
              </td>
              <td>{spot.isPremium ? 'Premium' : 'Free'}</td>
              <td>
                {spot.youtubeLinks.map((link, index) => (
                  <div key={index} className='inline'>
                    <a key={index} href={link} className='link'>
                      {index + 1}
                    </a>{' '}
                  </div>
                ))}
              </td>
              <td>
                <button
                  className='w-24 p-1 bg-slate-300 hover:bg-slate-400 rounded-lg shadow-md'
                  onClick={() => alert('Not yet implemented.')}
                >
                  Add YT Link
                </button>
              </td>
              <td>
                <button
                  className='w-12 p-1 bg-yellow-300 hover:bg-yellow-500 rounded-lg shadow-md'
                  onClick={() => alert('Not yet implemented.')}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className='w-12 p-1 bg-red-400 hover:bg-red-600 rounded-lg shadow-md'
                  onClick={() => alert('Not yet implemented.')}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
