'use client';

import DeletableTags from '@/components/tags/DeletableTags';
import { redirect } from 'next/navigation';
import { useState, MouseEvent, FormEvent } from 'react';

type AddSpotFormProps = {
  addSpot: (spot: NewSpot) => Promise<string | undefined>;
};

export default function AddSpotForm({ addSpot }: AddSpotFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('active');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState(Array<string>);
  const [images, setImages] = useState(Array<string>);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [isPremium, setIsPremium] = useState(false);

  const handleAddTag = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!tags.includes(tag)) {
      tags.push(tag);
      setTag('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSpotData = addSpot({
      name: name,
      description: description,
      city: city,
      lat: Number(lat),
      lng: Number(lng),
      isPremium: isPremium,
      type: type,
      status: status,
      tags: tags,
      youtubeLinks: [youtubeLink],
      images: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const newSpotId = await newSpotData;
    console.log('new spot ID is: ', newSpotId);
    redirect(`/spot/id${newSpotId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name' className='font-bold'>
        SPOT NAME:
      </label>
      <input
        id='name'
        name='name'
        type='text'
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor='description' className='font-bold'>
        DESCRIPTION:
      </label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        id='description'
        name='description'
        rows={4}
        cols={56}
        required
      />
      <label htmlFor='city' className='font-bold'>
        CITY:
      </label>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        id='city'
        name='city'
        type='text'
        required
      />
      <label htmlFor='lat' className='font-bold'>
        LATITUDE:
      </label>
      <input
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        id='lat'
        name='lat'
        type='text'
        required
      />
      <label htmlFor='lng' className='font-bold'>
        LONGITUDE:
      </label>
      <input
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        id='lng'
        name='lng'
        type='text'
        required
      />
      <label htmlFor='type' className='font-bold'>
        TYPE:
      </label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        name='type'
        id='type-select'
      >
        <option value=''>--Choose a spot type--</option>
        <option value='handrail'>Handrail</option>
        <option value='stairs'>Stairs</option>
        <option value='gap'>Gap</option>
        <option value='ledge'>Ledge</option>
        <option value='pad'>Manual Pad</option>
        <option value='hubba'>Hubba</option>
        <option value='bank'>Bank</option>
        <option value='street transition'>Street Transition</option>
        <option value='curb'>Curb</option>
        <option value='bump'>Bump to bar, etc.</option>
        <option value='misc'>Misc</option>
      </select>
      <div className='flex-col'>
        <p className='font-bold'>STATUS:</p>
        <div>
          <input
            type='radio'
            name='status'
            value='active'
            checked={status === 'active'}
            onChange={(e) => setStatus(e.target.value)}
          />
          <label
            htmlFor='active'
            className='pl-1 inline'
            onClick={() => setStatus('active')}
          >
            Active
          </label>
        </div>
        <div>
          <input
            type='radio'
            name='status'
            value='skate-stopped'
            checked={status === 'skate-stopped'}
            onChange={(e) => setStatus(e.target.value)}
          />
          <label
            htmlFor='skate-stopped'
            className='pl-1 inline'
            onClick={() => setStatus('skate-stopped')}
          >
            Skate-stopped
          </label>
        </div>
        <div>
          <input
            type='radio'
            name='status'
            value='rip'
            checked={status === 'rip'}
            onChange={(e) => setStatus(e.target.value)}
          />
          <label
            htmlFor='rip'
            className='pl-1 inline'
            onClick={() => setStatus('rip')}
          >
            RIP (demolished, etc.)
          </label>
        </div>
      </div>
      <label htmlFor='tag' className='font-bold'>
        TAGS:
      </label>
      <input
        value={tag}
        id='tag'
        name='tag'
        type='text'
        onChange={(e) => setTag(e.target.value)}
      />
      <button
        className='p-1 ml-2 rounded-md bg-green-400 hover:bg-green-500'
        onClick={handleAddTag}
      >
        Add Tag
      </button>
      <DeletableTags tags={tags} handleDeleteTag={handleDeleteTag} />
      <label htmlFor='' className='font-bold'>
        YOUTUBE LINK:
      </label>
      <input
        className='w-full'
        value={youtubeLink}
        onChange={(e) => setYoutubeLink(e.target.value)}
        id='youtube'
        name='youtube'
        type='text'
        required
      />
      <label htmlFor='premium' className='font-bold'>
        FREE/PREMIUM:
      </label>
      <input
        type='checkbox'
        checked={isPremium}
        onChange={() => setIsPremium((prevBool) => !prevBool)}
        className='mr-1'
      />
      Check if premium - default is free.
      <input
        type='submit'
        value='Add Spot'
        className='mx-auto py-2 px-3 bg-green-400 rounded-lg hover:bg-green-500 hover:cursor-pointer shadow-md text-lg block'
      />
    </form>
  );
}
