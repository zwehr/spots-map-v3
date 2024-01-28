import Image from 'next/image';
import Link from 'next/link';
import supabase from '@/lib/utils/supabase';
import { merriweather } from '@/app/fonts';

export default async function ImageGrid() {
  const { data: spots } = await supabase.from('spots').select();
  console.log(spots);
  spots && console.log(spots.length);

  return (
    <div className='grid grid-cols-9 grid-rows-5 gap-1 p-4'>
      <div className='absolute w-96 mx-auto mt-24 left-0 right-0 bg-blur-md bg-white/95 rounded-lg text-center z-10'>
        <p className='uppercase text-center text-4xl my-8'>Find Spots</p>
        <input
          type='text'
          placeholder='Enter a location...'
          className={`mx-auto my-6 bg-slate-100 border border-slate-300 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 ${merriweather.className}`}
        ></input>
        <button
          className='uppercase text-lg text-slate-200 bg-emerald-600 hover:bg-emerald-700 w-24 rounded-md p-2 mb-3'
          disabled
        >
          Go!
        </button>
      </div>

      {spots &&
        spots.map((spot) => (
          <div
            key={spot.id}
            className='bg-slate-200 rounded-md hover:bg-slate-300'
          >
            <Link href='#'>
              <Image
                className='hover:scale-105 transition-all duration-500 rounded-sm opacity-50 hover:opacity-100'
                src={spot.image_links[0]}
                width={500}
                height={600}
                alt='Skatespot photo'
              />
            </Link>
          </div>
        ))}
    </div>
  );
}
