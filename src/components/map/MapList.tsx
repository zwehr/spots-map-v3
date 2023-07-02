import MapListItem from '@/components/map/MapListItem';

type MapListProps = {
  spots: Spot[] | undefined;
  selectedSpot: string;
};

export default function MapList({ spots, selectedSpot }: MapListProps) {
  return (
    <div className='h-full overflow-y-scroll'>
      <h2>hi</h2>
      {spots &&
        spots.map((spot) => (
          <MapListItem spot={spot} selectedSpot={selectedSpot} key={spot._id} />
        ))}
    </div>
  );
}
