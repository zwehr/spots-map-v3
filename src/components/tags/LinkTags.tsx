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
          className={`bg-sky-200 m-1 p-1 rounded-lg hover:bg-sky-400 shadow-md ${
            tag === selectedTag ? 'bg-sky-400' : 'bg-sky-200'
          }`}
          key={index}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
