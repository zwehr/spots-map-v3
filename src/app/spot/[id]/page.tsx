import SpotDetails from '@/components/spot/SpotDetails';
import VideoCarousel from '@/components/spot/VideoCarousel';
import getSpotById from '@/lib/fetch/getSpotById';

export default async function Spot({ params }: { params: { id: string } }) {
  const spotData: Promise<Spot | null | undefined> = getSpotById(params.id);
  const spot = await spotData;

  return (
    <>
      <h1>{spot ? spot.name : 'Cannot find spot with ID ' + params.id}</h1>
      <div className='w-1/2 mx-auto'>
        {spot && <VideoCarousel youtubeLinks={spot.youtubeLinks} />}
        {spot && <SpotDetails spot={spot} />}
      </div>
    </>
  );
}
