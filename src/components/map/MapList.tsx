import MapListItem from '@/components/map/MapListItem';

type MapListProps = {
  spots: Spot[] | undefined;
};

export default function MapList({ spots }: MapListProps) {
  return (
    <div className='h-full overflow-y-scroll'>
      <h2 className='mt-16'>Current Spots</h2>
      {spots && spots.map((spot) => <MapListItem spot={spot} />)}
    </div>
  );
}
