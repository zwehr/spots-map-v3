import supabase from '@/lib/utils/supabase';

export default async function SkateVideo({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data } = await supabase
    .from('videos')
    .select()
    .match({ id })
    .single();

  return (
    <div className='max-w-5xl mx-auto p-2'>
      <h1>{data.title}</h1>
      <div className='flex mt-12'>
        <div className='w-1/3'>
          <img src={data.thumbnail_image_url} />
          <ul className='text-xl'>
            <li>Company: {data.company}</li>
            <li>Released: {data.release_year}</li>
            <li>
              Watch Online:{' '}
              <a href={data.youtube_link} className='link'>
                YouTube
              </a>
            </li>
          </ul>
        </div>
        <div className='w-2/3 text-center'>[map here]</div>
      </div>
      <div className='text-center mt-8'>
        <h2>Featured Spots</h2>
        <span>[featured spots here]</span>
      </div>
    </div>
  );
}
