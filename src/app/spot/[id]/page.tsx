import SpotDetails from '@/components/spot/SpotDetails';
import SpotImage from '@/components/spot/SpotImage';
import { Database } from '../../../../types/supabase';
import supabase from '@/lib/utils/supabase';
import SingleSpotMap from '@/components/spot/SingleSpotMap';

export default async function Spot({ params }: { params: { id: string } }) {
  type Spot = Database['public']['Tables']['spots']['Row'];

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
      <div className='max-w-5xl mx-auto'>
        <h1 className='uppercase'>
          {spot ? spot.name : 'Cannot find spot with ID ' + params.id}
        </h1>
        <div className='flex'>
          <div className='w-1/2 p-2'>
            {spot && <SpotImage images={spot.image_links} />}
          </div>
          <div className='w-1/2 p-2'>
            <SingleSpotMap lat={spot.lat} lng={spot.lng} />
          </div>
        </div>
        <div className='w-1/2 mx-auto mt-6'></div>

        <div className='w-1/2 mx-auto'>
          {spot && <SpotDetails spot={spot} />}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
