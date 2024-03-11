import LinkTags from '../tags/LinkTags';
import { Database } from '../../../types/supabase';

type Spot = Database['public']['Tables']['spots']['Row'];

export default function SpotDetails({ spot }: { spot: Spot }) {
  return (
    <>
      <p className='mb-4'>
        <span className='font-bold'>Location Coordinates: </span>
        <a
          href={`https://maps.google.com/?q=${spot.lat},${spot.lng}`}
          className='link'
          target='_blank'
        >
          {spot.lat && spot.lat.toFixed(5)}, {spot.lng && spot.lng.toFixed(5)}{' '}
          (Click to view on Google Maps)
        </a>
      </p>
      <p>
        <span className='font-bold'>Tags: </span>
      </p>
      <LinkTags tags={spot.tags} />
      <p className='text-red-500 text-xl'>[More Info Later]</p>
    </>
  );
}
