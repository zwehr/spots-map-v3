'use client';

import { Database } from '../../../types/supabase';
import LinkTags from '@/components/tags/LinkTags';

type Spot = Database['public']['Tables']['spots']['Row'];

type AdminSpotsTableProps = {
  spots: Spot[];
};

export default function AdminSpotsTable({ spots }: AdminSpotsTableProps) {
  return (
    <>
      <table className='max-w-7xl mx-auto text-sm'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>City</th>
            <th>State/Province</th>
            <th>Country</th>
            <th>Status</th>
            <th>$$$</th>
          </tr>
        </thead>
        <tbody>
          {spots.map((spot) => (
            <tr key={spot.id}>
              <td>{spot.name}</td>
              <td>
                <span className='capitalize'>{spot.type}</span>
              </td>
              <td>{spot.city}</td>
              <td>{spot.state_province}</td>
              <td>{spot.country}</td>
              <td>
                <span className='capitalize'>{spot.status}</span>
              </td>
              <td>{spot.is_premium ? 'Premium' : 'Free'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
