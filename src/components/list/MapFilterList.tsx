import MapFilterListItem from './MapFilterListItem';
import { Database } from '../../../types/supabase';

type Spot = Database['public']['Tables']['spots']['Row'];

type MapFilterListProps = {
  spots: Spot[] | null;
};

export default function MapFilterList({ spots }: MapFilterListProps) {
  return (
    <div className='w-1/2 min-h-96 p-4 bg-gray-100 rounded-md m-4'>
      {spots ? (
        spots.map((spot) => <MapFilterListItem key={spot.id} spot={spot} />)
      ) : (
        <p>No Spots Found</p>
      )}
    </div>
  );
}
