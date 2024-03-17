'use server';

import SearchMapListContainer from '@/components/map/SearchMapListContainer';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '../../../../types/supabase';

type Spot = Database['public']['Tables']['spots']['Row'];

type SpotsListParams = {
  query: string;
  city: string;
};

export default async function SpotsList({
  searchParams,
}: {
  searchParams: SpotsListParams | null;
}) {
  const params = searchParams;
  let spotsData: Spot[] | null = null;

  // If there are search params, user reached this page by looking for similar spots on map
  // If not, user went directly to the search page.
  if (params?.city && params.query) {
    const cookieStore = cookies;
    const supabase = createServerComponentClient({
      cookies: () => cookieStore(),
    });

    const { data, error } = await supabase
      .from('spots')
      .select()
      .ilike('city', params.city)
      .or(`type.eq.${params.query}, tags.cs.{${params.query}}`);

    if (error) {
      console.log(error);
    }

    spotsData = data as Spot[];
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <h1 className='uppercase'>Search</h1>
      <SearchMapListContainer
        spots={spotsData ? spotsData : null}
        paramQuery={params ? params.query : ''}
        paramCity={params ? params.city : ''}
      />
    </div>
  );
}
