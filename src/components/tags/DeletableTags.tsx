import { MouseEvent } from 'react';

type DeletableTagsProps = {
  tags: Array<string>;
  handleDeleteTag: (tag: string) => void;
};

export default function DeletableTags({
  tags,
  handleDeleteTag,
}: DeletableTagsProps) {
  return (
    <div>
      Current tags (click tag to delete):
      <div className='flex flex-wrap mb-3'>
        {tags.length > 0 ? (
          tags.map((tag) => (
            <div
              key={tag}
              className='bg-sky-300 p-1 m-1 rounded-md cursor-pointer'
              onClick={() => handleDeleteTag(tag)}
            >
              {tag}
            </div>
          ))
        ) : (
          <p className='italic text-red-600 pl-2'>No tags added</p>
        )}
      </div>
    </div>
  );
}
