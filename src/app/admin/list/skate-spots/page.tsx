import AdminSpotsTable from '@/components/tables/AdminSpotsTable';
import supabase from '@/lib/utils/supabase';
import { Database } from '../../../../../types/supabase';

export default async function AdminSpotsListContainer() {
  const { data, error } = await supabase.from('spots').select();

  if (error) {
    console.log(error);
  }

  type Spot = Database['public']['Tables']['spots']['Row'];
  const spots = data as Spot[];

  return (
    <>
      <h1>Admin Spots List</h1>
      <p className='text-red-500 text-xl text-center mb-8'>
        [Add more fields/options later]
      </p>
      <AdminSpotsTable spots={spots} />
    </>
  );
}
