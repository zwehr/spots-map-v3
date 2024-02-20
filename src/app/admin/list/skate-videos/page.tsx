import supabase from '@/lib/utils/supabase';
import AdminVideoTable from '@/components/tables/AdminVideosTable';
import { cookies } from 'next/headers';
import {
  User,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';

// always getting fresh db data for admin
export const revalidate = 0;

export default async function SkateVideosList() {
  const deleteVid = async (id: number) => {
    'use server';
    const supabase = createServerComponentClient({ cookies });
    const { error } = await supabase.from('videos').delete().eq('id', id);
  };

  const { data, error } = await supabase
    .from('videos')
    .select()
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching from Supabase: ', error.message);
  }

  if (data) {
    return (
      <>
        <h1 className='uppercase'>Admin Skate Videos List</h1>
        <div className='max-w-6xl mx-auto'>
          <AdminVideoTable videos={data} deleteVid={deleteVid} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Admin Skate Videos List</h1>
        <p>No data found.</p>
      </>
    );
  }
}
