import MapListItem from '@/components/map/MapListItem';

type MapListProps = {
  spots: Spot[] | undefined;
  selectedSpot: string;
};

export default function MapList({ spots, selectedSpot }: MapListProps) {
  return (
    <div className='h-full overflow-y-scroll'>
      {spots && spots.length > 0 ? (
        <p className='ml-4 mt-2 text-xl'>{`${spots.length} ${
          spots.length > 1 ? 'spots' : 'spot'
        } in current area:`}</p>
      ) : (
        <p className='text-red-500 ml-4 mt-2 text-xl'>
          No spots found. Try searching another area.
        </p>
      )}
      {spots &&
        spots.map((spot) => (
          <MapListItem spot={spot} selectedSpot={selectedSpot} key={spot._id} />
        ))}
    </div>
  );
}
