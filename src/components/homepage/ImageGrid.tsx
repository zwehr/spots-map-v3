'use server';

import Link from 'next/link';
import supabase from '@/lib/utils/supabase';
import BrowseOptionsWindow from './BrowseOptionsWindow';

export default async function ImageGrid() {
  const { data: tileSpots } = await supabase
    .from('spots')
    .select('id, image_thumbnail_link')
    .order('id', { ascending: true })
    .range(0, 44);

  return (
    <div className='grid grid-cols-9 grid-rows-5 gap-1 p-4'>
      <BrowseOptionsWindow />
      {tileSpots &&
        tileSpots.map((spot) => (
          <div
            key={spot.id}
            className='bg-slate-200 rounded-md hover:bg-slate-300'
          >
            <Link href={`/spot/${spot.id}`}>
              <img
                className='rounded-sm opacity-50 hover:opacity-100 transition-all duration-200'
                src={spot.image_thumbnail_link}
                width={400}
                height={300}
                alt='Skatespot photo'
              />
            </Link>
          </div>
        ))}
    </div>
  );
}
