import AddSpotForm from '@/components/forms/AddSpotForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default function AddSpot() {
  const addSpot = async (
    name: string,
    lat: number,
    lng: number,
    city: string,
    country: string,
    type: string,
    isPremium: boolean,
    status: string,
    tags: string[],
    image_links: string[],
    featured_in: number[]
  ) => {
    'use server';
    const supabase = createServerComponentClient({ cookies });

    try {
      const { error } = await supabase.from('spots').insert({
        name: name,
        lat: lat,
        lng: lng,
        city: city,
        country: country,
        type: type,
        is_premium: isPremium,
        status: status,
        tags: tags,
        image_links: image_links,
        featured_in: featured_in,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className='uppercase'>Add Spot</h1>
      <div className='bg-gray-200 max-w-5xl mx-auto mb-24 p-6 rounded-md shadow-lg'>
        <AddSpotForm addSpot={addSpot} />
      </div>
    </>
  );
}
