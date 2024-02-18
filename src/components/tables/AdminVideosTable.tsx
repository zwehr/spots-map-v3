'use client';

import { Database } from '../../../types/supabase';
import { useRouter } from 'next/navigation';
import { deleteVideo } from './actions';

type Video = Database['public']['Tables']['videos']['Row'];
type AdminVideosTableProps = {
  videos: Video[] | undefined;
};

export default function AdminVideoTable({ videos }: AdminVideosTableProps) {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    console.log(`inside handleDelete in AdminVideosTable, id is ${id}`);
    const deleteVideoResponse = await deleteVideo(id);
    console.log(deleteVideoResponse);
    router.refresh();
  };

  return (
    <>
      <table className='w-full mb-48'>
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
          {videos &&
            videos.map((video) => (
              <tr key={video.id}>
                <td>{video.title}</td>
                <td>
                  {video.company ? (
                    video.company
                  ) : (
                    <span className='null'>NULL</span>
                  )}
                </td>
                <td>{video.release_year}</td>
                <td>
                  <a href={video.youtube_link} className='link'>
                    Link
                  </a>{' '}
                  -{' '}
                  <a href={video.youtube_embed_link} className='link'>
                    Link
                  </a>
                </td>
                <td>
                  <a href={video.thumbnail_image_url} className='link'>
                    Link
                  </a>
                </td>
                <td>
                  <button className='py-0.5 px-2 caution rounded uppercase'>
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className='p-0.5 px-2 delete rounded uppercase'
                    onClick={() => handleDelete(video.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
