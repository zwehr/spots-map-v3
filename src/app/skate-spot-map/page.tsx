import MapList from '@/components/map/MapList';
import GoogleMapFull from '@/components/map/GoogleMapFull';

export default function Map() {
  return (
    <>
      <div className='flex h-screen w-screen flex-col lg:flex-row bg-rose-100'>
        <div className='lg:w-1/3 h-full bg-emerald-100'>
          <MapList />
        </div>
        <div className='lg:w-2/3 h-full bg-violet-100'>
          <GoogleMapFull />
        </div>
      </div>
    </>
  );
}
