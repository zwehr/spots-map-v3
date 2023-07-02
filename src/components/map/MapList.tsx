import MapListItem from '@/components/map/MapListItem';

type MapListProps = {
  spots: Spot[] | undefined;
};

export default function MapList({ spots }: MapListProps) {
  const heightMinusNavStyle = {
    height: 'calc(100vh - 60px)',
  };

  return (
    <div style={heightMinusNavStyle} className='overflow-y-scroll'>
      {spots && spots.map((spot) => <MapListItem spot={spot} key={spot._id} />)}
    </div>
  );
}
