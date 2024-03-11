import { merriweather } from '@/app/fonts';
import Link from 'next/link';
import { FaArrowAltCircleRight } from 'react-icons/fa';

type FeaturedSpotItemProps = {
  id: number;
  name: string;
  city: string;
  country: string;
};

export default function FeaturedSpotItem({
  id,
  name,
  city,
  country,
}: FeaturedSpotItemProps) {
  return (
    <div className='bg-gray-200 my-2 px-2 py-1 rounded'>
      <h3 className='uppercase mr-4 text-xl text-left'>{name}</h3>
      <div className='flex'>
        <p className={merriweather.className}>
          {city}, {country}
        </p>
        <div className='ml-auto'>
          <p>
            <Link className='link ml-auto' href={`/spot/${id}`} target='_blank'>
              More Info
              <FaArrowAltCircleRight className='inline' />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
