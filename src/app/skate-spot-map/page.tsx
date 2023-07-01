import MapList from '@/components/map/MapList';
import GoogleMapFull from '@/components/map/GoogleMapFull';
import getAllSpots from '@/lib/fetch/getAllSpots';

export default async function Map() {
  return (
    <>
      <div className='flex h-screen w-screen flex-col-reverse lg:flex-row'>
        <div className='lg:w-1/3 h-full'>
          <MapList />
        </div>
        <div className='lg:w-2/3 h-full'>
          <GoogleMapFull />
        </div>
      </div>
    </>
  );
}
