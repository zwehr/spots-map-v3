import MapFilterListItem from './MapFilterListItem';
import { Database } from '../../../types/supabase';

type Spot = Database['public']['Tables']['spots']['Row'];

type MapFilterListProps = {
  spots: Spot[] | null;
  selectedSpot: number | null;
  setSelectedSpot: (spotId: number) => void;
};

export default function MapFilterList({
  spots,
  selectedSpot,
  setSelectedSpot,
}: MapFilterListProps) {
  if (spots && spots.length > 0) {
    return spots.map((spot) => (
      <MapFilterListItem
        key={spot.id}
        spot={spot}
        selectedSpot={selectedSpot}
      />
    ));
  } else if (spots && spots.length === 0) {
    return <p className='text-center'>No spots found, try another search.</p>;
  } else {
    return <p className='text-center'>Search to see spots.</p>;
  }
}
