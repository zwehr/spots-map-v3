import { merriweather } from '@/app/fonts';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import Link from 'next/link';
import { Database } from '../../../types/supabase';

type Spot = Database['public']['Tables']['spots']['Row'];

type MapFilterListItemProps = {
  spot: Spot;
  selectedSpot: number | null;
};

export default function MapFilterListItemProps({
  spot,
  selectedSpot,
}: MapFilterListItemProps) {
  return (
    <div
      className={` my-2 px-2 py-1 rounded ${
        selectedSpot === spot.id
          ? 'shadow-md shadow-blue-200/80 bg-blue-200'
          : 'bg-gray-200'
      } `}
    >
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
              <div className='items-center flex'>
                <p>More Info</p>
                <FaArrowAltCircleRight className='ml-0.5' />
              </div>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
