import MapListItem from '@/components/map/MapListItem';

type MapListProps = {
  spots: Spot[] | undefined;
  selectedSpot: string;
};

export default function MapList({ spots, selectedSpot }: MapListProps) {
  return (
    <div className='h-full overflow-y-scroll'>
      <p className='ml-4 mt-2 text-xl'>
        {spots && spots.length > 0 && `${spots.length} spots found.`}
      </p>
      {spots &&
        spots.map((spot) => (
          <MapListItem spot={spot} selectedSpot={selectedSpot} key={spot._id} />
        ))}
    </div>
  );
}
