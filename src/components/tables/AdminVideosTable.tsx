'use client';

import { Database } from '../../../types/supabase';
import { useRouter } from 'next/navigation';
import { deleteVideo } from './actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Video = Database['public']['Tables']['videos']['Row'];
type AdminVideosTableProps = {
  videos: Video[] | undefined;
  deleteVid: (id: number) => void;
};

export default function AdminVideoTable({
  videos,
  deleteVid,
}: AdminVideosTableProps) {
  const router = useRouter();

  const handleDelete = (id: number) => {
    deleteVid(id);
    router.refresh();
    successfulDeleteMessage();
  };

  const successfulDeleteMessage = () =>
    toast.success('Video deleted successfully', {
      position: 'bottom-left',
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

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
      <ToastContainer
        position='bottom-left'
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
}
