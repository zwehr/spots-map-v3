import { merriweather } from '@/app/fonts';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import Link from 'next/link';
import { Database } from '../../../types/supabase';

type Spot = Database['public']['Tables']['spots']['Row'];

type MapFilterListItemProps = {
  spot: Spot;
};

export default function MapFilterListItemProps({
  spot,
}: MapFilterListItemProps) {
  return (
    <div className='bg-gray-200 my-2 px-2 py-1 rounded'>
      <h3 className='uppercase mr-4 text-xl'>{spot.name}</h3>
      <div className='flex'>
        <p className={merriweather.className}>
          {spot.city}, {spot.country}
        </p>
        <div className='ml-auto'>
          <p>
            <Link
              className='link ml-auto'
              href={`/spot/${spot.id}`}
              target='_blank'
            >
              More Info
              <FaArrowAltCircleRight className='inline' />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
