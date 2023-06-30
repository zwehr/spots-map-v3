import Link from 'next/link';

type TagProps = {
  tags: Array<string>;
};

export default function LinkTags({ tags }: TagProps) {
  return (
    <div className='flex flex-wrap'>
      {tags.map((tag, index) => (
        <Link
          href={`/list/skate-spots/tag/${tag}`}
          className='bg-emerald-200 m-1 p-1 rounded-lg hover:bg-emerald-300'
          key={index}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
