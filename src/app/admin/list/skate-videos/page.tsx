import supabase from '@/lib/utils/supabase';

export default async function SkateVideosList() {
  const { data, error } = await supabase.from('videos').select();

  if (error) {
    console.error('Error fetching from Supabase: ', error.message);
  }

  if (data) {
    return (
      <>
        <h1 className='uppercase'>Admin Skate Videos List</h1>
        <div className='max-w-6xl mx-auto'>
          <table className='w-full'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Released</th>
                <th>Youtube Links (Plain - Embed)</th>
                <th>Image Link</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => (
                <tr key={data.id}>
                  <td>{data.title}</td>
                  <td>{data.company}</td>
                  <td>{new Date(data.release_year).getUTCDate()}</td>
                  <td>
                    <a href={data.youtube_link} className='link'>
                      Link
                    </a>{' '}
                    -{' '}
                    <a href={data.youtube_embed_link} className='link'>
                      Link
                    </a>
                  </td>
                  <td>
                    <a href={data.thumbnail_image_url} className='link'>
                      Link
                    </a>
                  </td>
                  <td>
                    <button className='p-1 bg-yellow-400 rounded hover:bg-yellow-500'>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button className='p-1 bg-red-400 rounded hover:bg-red-500'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Admin Skate Videos List</h1>
        <p>No data found.</p>
      </>
    );
  }
}
