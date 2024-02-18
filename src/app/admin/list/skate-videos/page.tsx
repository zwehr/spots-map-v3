import supabase from '@/lib/utils/supabase';
import AdminVideoTable from '@/components/tables/AdminVideosTable';

// always getting fresh db data for admin
export const revalidate = 0;

export default async function SkateVideosList() {
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
          <AdminVideoTable videos={data} />
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
