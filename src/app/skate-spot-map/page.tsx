import MapList from '@/components/map/MapList';
import GoogleMapFull from '@/components/map/GoogleMapFull';
import getAllSpots from '@/lib/fetch/getAllSpots';

export default async function Map() {
  const spotsData: Promise<Spot[] | undefined> = getAllSpots();
  const spots = await spotsData;

  const heightMinusNavStyle = {
    height: 'calc(100vh - 60px)',
  };

  return (
    <>
      <div
        className='flex w-screen flex-col-reverse lg:flex-row'
        style={heightMinusNavStyle}
      >
        <div className='lg:w-1/3'>
          <MapList spots={spots} />
        </div>
        <div className='lg:w-2/3'>
          <GoogleMapFull spots={spots} />
        </div>
      </div>
    </>
  );
}
