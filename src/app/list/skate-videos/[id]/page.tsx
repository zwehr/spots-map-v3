import FeaturedSpotItem from '@/components/list/FeaturedSpotItem';
import supabase from '@/lib/utils/supabase';

export default async function SkateVideo({
  params: { id },
}: {
  params: { id: string };
}) {
  // first get video data associated with param id
  const { data: videoData, error: videoError } = await supabase
    .from('videos')
    .select()
    .match({ id })
    .single();

  // next get IDs of spots from spots_videos M:M table
  // this may not be ideal approach selecting/joining from M:M... SQL + rpc may be better
  const { data: spotIdData, error: spotIdError } = await supabase
    .from('spots_videos')
    .select('spot_id')
    .eq('video_id', id);

  // create array of spot IDs
  const spotIds: any = spotIdData ? spotIdData.map((row) => row.spot_id) : null;
  console.log('this is array right', spotIds);

  // use those IDs to get relevant spot data
  const { data: spotsJoinData, error: spotsJoinError } = await supabase
    .from('spots')
    .select('*')
    .in('id', spotIds);

  console.log(spotsJoinData);

  return (
    <div className='max-w-6xl mx-auto p-2'>
      <h1>{videoData.title}</h1>
      <div className='mt-12'>
        <div className='w-1/3 mx-auto'>
          <img src={videoData.thumbnail_image_url} alt='video thumbnail' />
          <ul className='text-xl'>
            <li>Company: {videoData.company ? videoData.company : 'N/A'}</li>
            <li>Released: {videoData.release_year}</li>
            <li>
              Watch Online:{' '}
              <a href={videoData.youtube_link} className='link'>
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='text-center mt-8'>
        <h2>Featured Spots</h2>
        <div className='flex'>
          <div className='w-1/2 h-96 m-4 bg-gray-100'>[map here later]</div>
          <div className='w-1/2 min-h-96 m-4 p-4 bg-gray-100'>
            {spotsJoinData &&
              spotsJoinData.map((spot) => (
                <FeaturedSpotItem
                  key={spot.id}
                  id={spot.id}
                  name={spot.name}
                  city={spot.city}
                  country={spot.country}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
