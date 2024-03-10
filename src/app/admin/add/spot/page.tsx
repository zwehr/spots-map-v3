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

    // Initialize with a default value
    // Will reassign after inserting spot, use for spots_videos M:M insert(s)
    let newSpotId: number = -1;

    // first create the new spot in spots table, selecting for new id
    try {
      const { data, error } = await supabase
        .from('spots')
        .insert({
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
        })
        .select();

      if (error) {
        console.error('Error inserting to spots table:', error.message);
        return;
      }

      if (data !== null) {
        // Use type assertion to convert data to an array
        const dataArray: any[] = data;

        if (dataArray.length > 0) {
          const insertedRecord = dataArray[0];
          const insertedId = insertedRecord.id;
          newSpotId = insertedId;
        } else {
          console.log('No new spot data inserted');
        }
      } else {
        console.log('No new spot data returned from database');
      }
    } catch (error) {
      console.log(error);
      return;
    }

    // create spots_videos M:M inserts based on all videos in featured_in
    for (const videoId of featured_in) {
      console.log(videoId, newSpotId);
      try {
        const { error } = await supabase.from('spots_videos').insert({
          video_id: videoId,
          spot_id: newSpotId,
        });
        if (error) {
          console.error(
            'Error inserting to spots_videos table:',
            error.message
          );
        }
      } catch (error) {
        console.log(error);
      }
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
