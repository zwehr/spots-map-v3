import SpotDetails from '@/components/spot/SpotDetails';
import VideoCarousel from '@/components/spot/VideoCarousel';
import getSpotById from '@/lib/fetch/getSpotById';
import SpotImage from '@/components/spot/SpotImage';

type VideoProps = {
  youtubeLinks: Array<string>;
};

export default async function Spot({ params }: { params: { id: string } }) {
  const spotData: Promise<Spot | null | undefined> = getSpotById(params.id);
  const spot = await spotData;

  return (
    <>
      <div className='w-1/2 mx-auto mt-6'>
        {spot && <SpotImage images={spot.images} />}
      </div>
      <h1>{spot ? spot.name : 'Cannot find spot with ID ' + params.id}</h1>
      <div className='w-1/2 mx-auto'>
        {spot && <VideoCarousel youtubeLinks={spot.youtubeLinks} />}
        {spot && <SpotDetails spot={spot} />}
      </div>
    </>
  );
}
