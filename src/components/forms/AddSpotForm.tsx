'use client';

import DeletableTags from '@/components/tags/DeletableTags';
import { useState, MouseEvent, FormEvent } from 'react';
import AddSuccessMessage from '@/components/forms/AddSuccessMessage';
import { BeatLoader } from 'react-spinners';
import { getSignedURL } from './actions';
import { nanoid } from 'nanoid';

type AddSpotFormProps = {
  addNewSpot: (newSpot: NewSpot) => Promise<string | undefined>;
};

export default function AddSpotForm({ addNewSpot }: AddSpotFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('active');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState(Array<string>);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [newSpotId, setNewSpotId] = useState('');
  const [fileName, setFileName] = useState('');
  const [userSubmitted, setUserSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const clearFormInputs = () => {
    setName('');
    setDescription('');
    setCity('');
    setLat('');
    setLng('');
    setType('');
    setStatus('active');
    setTag('');
    setTags([]);
    setFile(undefined);
    setYoutubeLink('');
    setIsPremium(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    } else {
      setFileUrl(undefined);
    }
  };

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserSubmitted(true);
    setSubmitSuccess(false);

    const randName = nanoid();
    const awsUrl =
      'https://skate-tourism-spot-images.s3.us-east-2.amazonaws.com/' +
      randName;

    // NOTE: Meant to check auth first with actions.ts, but currently just returns success
    // Modify actions.ts later
    // https://www.youtube.com/watch?v=t-lhgq7Nfpc&t=85s&ab_channel=SamMeech-Ward
    try {
      if (file) {
        console.log('file: ', file);
        const checksum = await computeSHA256(file);
        const signedUrlResult = await getSignedURL(
          file.type,
          file.size,
          checksum
        );
        if (signedUrlResult.failure !== undefined) {
          console.error('error getting signed url');
          throw new Error(signedUrlResult.failure);
        }
        if (signedUrlResult.success) {
          const url = signedUrlResult.success.url;
          console.log('signedUrlResult: ', signedUrlResult);

          await fetch(url, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
            },
          });
        }
      }
      const newSpotResponse = addNewSpot({
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
        images: [awsUrl],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const newSpotResponseSecond = await newSpotResponse;
      const newlyInsertedId = newSpotResponseSecond;
      if (typeof newlyInsertedId === 'string') {
        setNewSpotId(newlyInsertedId);
        setSubmitSuccess(true);
        clearFormInputs();
        setUserSubmitted(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const closeSuccessMessage = () => {
    setSubmitSuccess(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name' className='font-bold'>
        SPOT NAME:
      </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        id='name'
        name='name'
        type='text'
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
        <option value='bank'>Bank</option>
        <option value='bump-to-bar'>Bump to Bar</option>
        <option value='curb'>Curb</option>
        <option value='flat bar'>Flat Bar</option>
        <option value='gap'>Gap</option>
        <option value='handrail'>Handrail</option>
        <option value='hubba'>Hubba</option>
        <option value='ledge'>Ledge</option>
        <option value='manny pad'>Manny Pad</option>
        <option value='stairs'>Stairs</option>
        <option value='street transition'>Street Transition</option>
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
        className='w-full mb-0'
        value={youtubeLink}
        onChange={(e) => setYoutubeLink(e.target.value)}
        id='youtube'
        name='youtube'
        type='text'
        required
      />
      <p className='mb-3'>
        (Note: YouTube embed link required. The format must be{' '}
        <a
          href='https://www.youtube.com/embed/nufgmoSNq0E?start=85'
          className='link'
        >
          https://www.youtube.com/<span className='font-bold'>embed</span>
          /nufgmoSNq0E?<span className='font-bold'>start=85</span>
        </a>{' '}
        and NOT{' '}
        <a href='https://youtu.be/nufgmoSNq0E?t=85' className='link'>
          https://youtu.be/nufgmoSNq0E?
          <span className='font-bold'>t=85</span>
        </a>
        . To get the correct link, make sure to click on &lsquo;Embed&lsquo;
        after clicking share, then copy the link from the embed code after
        making sure &lsquo;Start at [timestamp]&lsquo; is selected.)
      </p>
      <label htmlFor='files' className='font-bold'>
        IMAGES:
      </label>
      <input
        type='file'
        className=''
        name='spot-photos'
        accept='image/jpeg, image/png'
        onChange={handleFileChange}
      ></input>
      {fileUrl && file && (
        <div className='w-24'>
          <img src={fileUrl} alt={file.name} />
        </div>
      )}
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
      {submitSuccess && (
        <AddSuccessMessage
          id={newSpotId}
          handleCloseClick={closeSuccessMessage}
        />
      )}
      <button className='mx-auto mt-5 mb-2 w-28 h-10 bg-green-400 rounded-lg hover:bg-green-500 hover:cursor-pointer shadow-md text-lg block'>
        {userSubmitted ? <BeatLoader size={12} /> : 'Add Spot'}
      </button>
    </form>
  );
}
