'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '../../../types/supabase';
import MapMain from '@/components/map/MapMain';
import SpotInfoPopup from '@/components/map/SpotInfoPopup';

export default async function Map() {
  type Spot = Database['public']['Tables']['spots']['Row'];

  const cookieStore = cookies;
  const supabase = createServerComponentClient({
    cookies: () => cookieStore(),
  });

  const { data } = await supabase.from('spots').select();
  const spots = data as Spot[];

  const mainContentStyle = {
    height: 'calc(100vh - 60px)',
  };

  return (
    <div className='flex flex-col'>
      <h1 className='hidden'>Skate Spots Map</h1>
      <div style={mainContentStyle} className='h-screen relative'>
        <MapMain spots={spots} />
      </div>
    </div>
  );
}
