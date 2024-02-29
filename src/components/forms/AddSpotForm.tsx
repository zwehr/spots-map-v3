'use client';

import supabase from '@/lib/utils/supabase';
import Link from 'next/link';
import DeletableTags from '@/components/tags/DeletableTags';
import { getVideoTitles } from './actions';
import { useState, MouseEvent, FormEvent, ChangeEvent, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { oswald } from '@/app/fonts';
import { MdDelete } from 'react-icons/md';
import AsyncSelect from 'react-select/async';

export default function AddSpotForm() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [isOutsideUsCaAu, setIsOutsideUsCaAu] = useState(true);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [lat, setLat] = useState<number | undefined>();
  const [lng, setLng] = useState<number | undefined>();
  const [type, setType] = useState('');
  const [status, setStatus] = useState('active');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState(Array<string>);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [fileName, setFileName] = useState('');
  const [featuredIn, setFeaturedIn] = useState(Array<OptionType>);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [userSubmitted, setUserSubmitted] = useState(false);

  const reverse = require('reverse-geocode');

  interface OptionType {
    label: string;
    value: number;
  }

  useEffect(() => {
    if (
      country == 'United States' ||
      country == 'Canada' ||
      country == 'Australia'
    ) {
      setIsOutsideUsCaAu(false);
    } else {
      setIsOutsideUsCaAu(true);
    }
  }, [country]);

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
    setCity('');
    setLat(undefined);
    setLng(undefined);
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

  const loadOptions = async (inputValue: string) => {
    console.log('in loadOptions');
    const videoTitles = await getVideoTitles(inputValue);
    console.log(videoTitles);

    // Map response data to format expected by AsyncSelect
    const options = videoTitles!.map((item) => ({
      label: item.title,
      value: item.id,
    }));

    return options;
  };

  const handleOptionClick = (option: OptionType) => {
    setFeaturedIn((prevFeaturedIn) => [...prevFeaturedIn, option]);
    setMenuIsOpen(false);
  };

  const handleDeleteFeaturedIn = (vidToDelete: OptionType) => {
    setFeaturedIn(
      featuredIn.filter((vidFeaturedIn) => vidFeaturedIn !== vidToDelete)
    );
  };

  const customOption = ({
    data,
    innerProps,
  }: {
    data: OptionType;
    innerProps: any;
  }) => (
    <div
      {...innerProps}
      onClick={() => handleOptionClick(data)}
      style={{ cursor: 'pointer' }}
    >
      {data.label}
    </div>
  );

  const handleLatLngChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    const [latStr, lngStr] = userInput.split(',');

    if (latStr !== undefined && lngStr !== undefined) {
      const lat = parseFloat(latStr.trim());
      const lng = parseFloat(lngStr.trim());

      if (!isNaN(lat)) {
        setLat(lat);
      }
      if (!isNaN(lng)) {
        setLng(lng);
      }
    }
  };

  const handleReverseGeocode = () => {
    let countryCode;
    if (country === 'United States') {
      countryCode = 'us';
    } else if (country === 'Canada') {
      countryCode = 'ca';
    } else {
      countryCode = 'au';
    }
    const reverseData = reverse.lookup(Number(lat), Number(lng), countryCode);
    console.log(reverseData);
    setCity(reverseData.city);
    setState(reverseData.state);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserSubmitted(true);

    try {
      const { error } = await supabase.from('spots').insert({
        name: name,
        lat: lat,
        lng: lng,
        city: city,
        country: country,
        type: type,
        is_premium: isPremium,
        status: status,
        tags: tags,
        image_links: [],
        featured_in: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex'>
        <div className='w-1/2'>
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
          <div>
            <p className='font-bold'>STATUS:</p>
            <input
              type='radio'
              name='status'
              value='active'
              checked={status === 'active'}
              onChange={(e) => setStatus(e.target.value)}
            />
            <label
              htmlFor='active'
              className='mr-4 ml-1 inline'
              onClick={() => setStatus('active')}
            >
              Active
            </label>
            <input
              type='radio'
              name='status'
              value='skate-stopped'
              checked={status === 'skate-stopped'}
              onChange={(e) => setStatus(e.target.value)}
            />
            <label
              htmlFor='skate-stopped'
              className='mr-4 ml-1 inline'
              onClick={() => setStatus('skate-stopped')}
            >
              Skate-stopped
            </label>
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
          <label htmlFor='tag' className='font-bold'>
            TAGS:
          </label>
          <input
            value={tag}
            id='tag'
            name='tag'
            type='text'
            className='mb-1'
            onChange={(e) => setTag(e.target.value)}
          />
          <button
            className={`px-2 py-0.5 ml-2 rounded-md bg-green-400 hover:bg-green-500 uppercase ${oswald.className}`}
            onClick={handleAddTag}
          >
            Add Tag
          </button>
          <DeletableTags tags={tags} handleDeleteTag={handleDeleteTag} />
          <label htmlFor='featured-in' className='uppercase font-bold'>
            Featured In:
          </label>
          <div className='w-4/5'>
            <AsyncSelect<OptionType>
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              components={{ Option: customOption }}
              menuIsOpen={menuIsOpen}
              onMenuOpen={() => setMenuIsOpen(true)}
              onMenuClose={() => setMenuIsOpen(false)}
            />
          </div>
          <div className='ml-6 mb-8 mt-1'>
            <ol>
              {featuredIn.length > 0 ? (
                featuredIn.map((vidFeaturedIn) => (
                  <li key={vidFeaturedIn.value} className='border'>
                    {vidFeaturedIn.label}
                    <MdDelete
                      className='inline pl-1 text-red-500 text-2xl cursor-pointer align-top'
                      onClick={() => handleDeleteFeaturedIn(vidFeaturedIn)}
                    />
                  </li>
                ))
              ) : (
                <p className='italic text-gray-600'>
                  If video is not in dropdown,{' '}
                  <Link className='link' href='/admin/add/video'>
                    add it to the video database
                  </Link>
                  .
                </p>
              )}
            </ol>
          </div>
        </div>
        <div className='w-1/2'>
          <label htmlFor='latLong' className='uppercase font-bold'>
            Latitude/Longitude:
          </label>
          <input
            type='text'
            name='latLong'
            id='latLong'
            onChange={(e) => handleLatLngChange(e)}
            className='mb-0 w-3/4'
            required
          />
          <div className='mb-8'>
            {lat && lng ? (
              <p>
                Lat: {lat} Lng: {lng}
              </p>
            ) : (
              <p className='text-red-500 italic'>
                Enter two numbers with comma and space between.
              </p>
            )}
          </div>
          <label htmlFor='country' className='uppercase font-bold'>
            Country:
          </label>
          <input
            type='text'
            name='country'
            id='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className='mb-1'
          />

          <button
            type='button'
            className={`block uppercase px-2 py-0.5 mt-1 rounded-lg shadow-md ${
              oswald.className
            } ${
              isOutsideUsCaAu
                ? 'bg-gray-200'
                : 'bg-green-400 hover:bg-green-500 hover:cursor-pointer'
            }`}
            onClick={handleReverseGeocode}
            disabled={isOutsideUsCaAu}
          >
            Get Geocode Results
          </button>
          <div className='mb-8'>
            {isOutsideUsCaAu && (
              <p className='text-gray-600 italic'>
                Country must be &apos;United States,&apos; &apos;Canada,&apos;
                or &apos;Australia&apos; to reverse geocode search. Otherwise
                enter City and State manually.
              </p>
            )}
          </div>

          <label htmlFor='city' className='uppercase font-bold'>
            City:
          </label>
          <input
            type='text'
            name='city'
            id='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <label htmlFor='state' className='uppercase font-bold'>
            State/Province:
          </label>
          <input
            type='text'
            name='state'
            id='state'
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
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
        </div>
      </div>
      <button
        className={`mx-auto mt-5 mb-2 w-28 h-10 bg-green-400 rounded-lg hover:bg-green-500 hover:cursor-pointer shadow-md text-lg block uppercase ${oswald.className}`}
      >
        {userSubmitted ? <BeatLoader size={12} /> : 'Add Spot'}
      </button>
    </form>
  );
}
