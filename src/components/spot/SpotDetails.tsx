import LinkTags from '../tags/LinkTags';
import { Database } from '../../../types/supabase';

type Spot = Database['public']['Tables']['spots']['Row'];

export default function SpotDetails({ spot }: { spot: Spot }) {
  return (
    <>
      <p className='mb-4'>
        <span className='font-bold'>Name:</span> {spot.name}
      </p>
      <p className='mb-4'>
        <span className='font-bold'>Description:</span> {spot.description}
      </p>
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
      <p className='mb-4 mt-4'>
        <span className='font-bold'>Type:</span>{' '}
        {spot.type && spot.type[0].toUpperCase() + spot.type.slice(1)}
      </p>
      <p className='mb-4'>
        <span className='font-bold'>Status:</span>{' '}
        {spot.status && spot.status[0].toUpperCase() + spot.status.slice(1)}
      </p>
      <p className='mb-4'>
        <span className='font-bold'>Date Added:</span>{' '}
        {new Date(spot.created_at).toLocaleDateString('en-US')}
      </p>
    </>
  );
}
