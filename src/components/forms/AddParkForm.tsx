'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { oswald } from '@/app/fonts';
import { MdDelete } from 'react-icons/md';
import Select, { ActionMeta, MultiValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import parkYearOptions from './parkYearOptions';
import { getVideoTitles } from './actions';

export default function AddParkForm() {
  const [name, setName] = useState('');
  const [builder, setBuilder] = useState('');
  const [builders, setBuilders] = useState(Array<string>);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [country, setCountry] = useState('');
  const [isOutsideUsCaAu, setIsOutsideUsCaAu] = useState(true);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [hasLights, setHasLights] = useState(false);
  const [isIndoor, setIsIndoor] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
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

  const handleAddBuilder = () => {
    builders.push(builder);
    setBuilder('');
  };

  const handleDeleteBuilder = (builderToDelete: string) => {
    setBuilders(builders.filter((builder) => builder !== builderToDelete));
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
    // Update the featuredIn state array when an option is clicked
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

  const handleReverseGeocode = () => {
    let countryCode;
    if (country === 'United States') {
      countryCode = 'us';
    } else if (country === 'Canada') {
      countryCode = 'ca';
    } else {
      countryCode = 'au';
    }
    console.log(reverse.lookup(Number(lat), Number(lng), countryCode));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted');
    if (builders.length == 0) {
      alert('Add at least one builder, or add Unknown');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex'>
        <div className='w-1/2'>
          <label htmlFor='name' className='uppercase font-bold'>
            Park Name:
          </label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-2/3'
            required
          />
          <label htmlFor='builder' className='uppercase font-bold'>
            Building Affiliates:
          </label>
          <input
            type='text'
            name='builder'
            id='builder'
            value={builder}
            onChange={(e) => setBuilder(e.target.value)}
            className='w-1/2 mb-0'
          />
          <button
            type='button'
            className={`uppercase py-0.5 px-2 ml-2 rounded-md bg-green-400 hover:bg-green-500 shadow-md ${oswald.className}`}
            onClick={handleAddBuilder}
          >
            Add Builder
          </button>
          <div className='ml-6 mb-8 mt-1'>
            <ol>
              {builders.length > 0 ? (
                builders.map((builder) => (
                  <li key={builder} className='border'>
                    {builder}
                    <MdDelete
                      className='inline pl-1 text-red-500 text-2xl cursor-pointer align-top'
                      onClick={() => handleDeleteBuilder(builder)}
                    />
                  </li>
                ))
              ) : (
                <p className='italic text-red-500'>
                  Add at least one builder, or add Unknown
                </p>
              )}
            </ol>
          </div>
          <label htmlFor='yearBuilt' className='uppercase font-bold'>
            Year Built:
          </label>
          <select>
            {parkYearOptions.map((yearOption) => (
              <option value={yearOption} key={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>
          <label htmlFor='private' className='uppercase font-bold'>
            Private:{' '}
          </label>
          <input
            type='checkbox'
            name='private'
            id='private'
            checked={isPrivate}
            onChange={() => setIsPrivate((prevBool) => !prevBool)}
          />{' '}
          <span onClick={() => setIsPrivate((prevBool) => !prevBool)}>
            Check if private - default is public
          </span>
          <label htmlFor='lights' className='uppercase font-bold'>
            Lights:{' '}
          </label>
          <input
            type='checkbox'
            id='lights'
            name='lights'
            checked={hasLights}
            onChange={() => setHasLights((prevBool) => !prevBool)}
          />{' '}
          <span onClick={() => setHasLights((prevBool) => !prevBool)}></span>
          Check if has lights - default is no lights
          <label htmlFor='indoor' className='uppercase font-bold'>
            Indoor:{' '}
          </label>
          <input
            type='checkbox'
            id='indoor'
            name='indoor'
            checked={isIndoor}
            onChange={() => setIsIndoor((prevBool) => !prevBool)}
          />{' '}
          Check if indoor - default is outdoor
          <label htmlFor='photo' className='uppercase font-bold'>
            Upload Photo:
          </label>
          <input type='file' />
          <label htmlFor='featured-in' className='uppercase font-bold'>
            Featured In:
          </label>
          <AsyncSelect<OptionType>
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            components={{ Option: customOption }}
            menuIsOpen={menuIsOpen}
            onMenuOpen={() => setMenuIsOpen(true)} // Set menuIsOpen to true when the menu opens
            onMenuClose={() => setMenuIsOpen(false)} // Set menuIsOpen to false when the menu closes
          />
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
                  If video is not in dropdown, add it to the video database.
                </p>
              )}
            </ol>
          </div>
        </div>

        <div className='w-1/2'>
          <label htmlFor='lat' className='uppercase font-bold'>
            Latitude:
          </label>
          <input
            type='text'
            name='lat'
            id='lat'
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />

          <label htmlFor='lng' className='uppercase font-bold'>
            Longitude:
          </label>
          <input
            type='text'
            name='lng'
            id='lng'
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />

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
                Country must be 'United States,' 'Canada,' or 'Australia to
                reverse geocode search.' Otherwise enter City and State
                manually.
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
        </div>
      </div>
      <button
        className={`uppercase mx-auto mt-5 mb-2 w-28 h-10 bg-green-400 rounded-lg hover:bg-green-500 hover:cursor-pointer shadow-md text-lg block ${oswald.className}`}
      >
        {userSubmitted ? <BeatLoader size={12} /> : 'Add Park'}
      </button>
    </form>
  );
}
