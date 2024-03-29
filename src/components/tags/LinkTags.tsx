import Link from 'next/link';
import { Database } from '../../../types/supabase';

type Tags = Database['public']['Tables']['spots']['Row']['tags'];

export default function LinkTags({ tags }: { tags: Tags }) {
  return (
    <div className='flex flex-wrap uppercase mb-4'>
      {tags &&
        tags.map((tag, index) => (
          <Link
            href={`/list/skate-spots/tag/${tag}`}
            className='bg-sky-200 m-1 px-3 py-0.5 rounded-lg hover:bg-sky-400 shadow-md'
            key={index}
          >
            {tag}
          </Link>
        ))}
    </div>
  );
}
