import Link from 'next/link';

type TagProps = {
  tags: Array<string>;
  selectedTag?: string;
};

export default function LinkTags({ tags, selectedTag }: TagProps) {
  return (
    <div className='flex flex-wrap'>
      {tags.map((tag, index) => (
        <Link
          href={`/list/skate-spots/tag/${tag}`}
          className={`bg-emerald-200 m-1 p-1 rounded-lg hover:bg-emerald-400 ${
            tag === selectedTag ? 'bg-emerald-400' : 'bg-emerald-200'
          }`}
          key={index}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
