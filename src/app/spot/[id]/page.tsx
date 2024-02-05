import SpotDetails from '@/components/spot/SpotDetails';
import VideoCarousel from '@/components/spot/VideoCarousel';
import SpotImage from '@/components/spot/SpotImage';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '../../../../types/supabase';
import supabase from '@/lib/utils/supabase';
import SingleSpotMap from '@/components/spot/SingleSpotMap';
// old mongodb helper import
//import getSpotById from '@/lib/fetch/getSpotById';

type VideoProps = {
  youtubeLinks: Array<string>;
};

export default async function Spot({ params }: { params: { id: string } }) {
  // old mongodb code
  //const spotData: Promise<Spot | null | undefined> = getSpotById(params.id);
  //const spot = await spotData;

  type Spot = Database['public']['Tables']['spots']['Row'];
  type ImageLinks = Database['public']['Tables']['spots']['Row']['image_links'];

  try {
    const { data, error } = await supabase
      .from('spots')
      .select()
      .eq('id', params.id);

    if (error) {
      console.error(error);
      return null;
    }

    const spot = (data as Spot[])[0];

    if (!spot) {
      console.error('Spot not found');
      return null;
    }

    return (
      <>
        <div>
          <SingleSpotMap lat={spot.lat} lng={spot.lng} />
        </div>
        <div className='w-1/2 mx-auto mt-6'>
          {spot && <SpotImage images={spot.image_links} />}
        </div>
        <h1 className='uppercase'>
          {spot ? spot.name : 'Cannot find spot with ID ' + params.id}
        </h1>
        <div className='w-1/2 mx-auto'>
          {spot && <VideoCarousel youtubeLinks={spot.youtube_links} />}
          {spot && <SpotDetails spot={spot} />}
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
