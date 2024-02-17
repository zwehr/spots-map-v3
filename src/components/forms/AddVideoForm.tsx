'use client';

import { useState } from 'react';
import { getSignedURL } from './actions';
import supabase from '@/lib/utils/supabase';
import { BeatLoader } from 'react-spinners';
import { oswald } from '@/app/fonts';

export default function AddVideoForm() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string>('');
  const [company, setCompany] = useState<string | null>(null);
  const [year, setYear] = useState<number>(2024);
  const [youtubePageLink, setYoutubePageLink] = useState<string>('');
  const [youtubeEmbedLink, setYoutubeEmbedLink] = useState<string>('');
  const [userSubmitted, setUserSubmitted] = useState<boolean>(false);

  const s3BaseUrl = 'https://skate-tourism.s3.us-east-2.amazonaws.com/';

  // 2024 to 1980 for year select options
  const releaseYears = Array.from({ length: 45 }, (_, index) => 2024 - index);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value, 10);
    setYear(selectedValue);
  };

  // from Sam Meech-Ward's tutorial (https://www.nexttonone.lol/upload-s3)
  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setUserSubmitted(true);
    e.preventDefault();

    try {
      if (file) {
        const checksum = await computeSHA256(file);
        const signedURLResult = await getSignedURL(
          file.type,
          file.size,
          checksum
        );

        if (signedURLResult.failure !== undefined) {
          throw new Error(signedURLResult.failure);
        }

        const fileName = signedURLResult.success.fileName;

        const url = signedURLResult.success.url;
        await fetch(url, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });
        const { error } = await supabase.from('videos').insert({
          title: title,
          company: company,
          release_year: year,
          youtube_link: youtubePageLink,
          youtube_embed_link: youtubeEmbedLink,
          thumbnail_image_url: s3BaseUrl + fileName,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUserSubmitted(false);
    }
    // good place for toast message
    console.log('made it to the end woohoo');
    setUserSubmitted(false);
  };

  const clearInputs = () => {
    setFile(undefined);
    setTitle('');
    setCompany(null);
    setYear(2024);
    setYoutubePageLink('');
    setYoutubeEmbedLink('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='title' className='uppercase font-bold'>
        Title:
      </label>
      <input
        type='text'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='w-1/2'
        required
      />

      <label htmlFor='company' className='uppercase font-bold'>
        Company:
      </label>
      <input
        type='text'
        name='company'
        value={company || ''}
        onChange={(e) => setCompany(e.target.value)}
        className='w-1/4 mb-0'
      />
      <p className='text-gray-600 italic mb-8'>
        Optional - Leave blank if no company
      </p>

      <label htmlFor='year' className='uppercase font-bold'>
        Year:
      </label>
      <select id='year' value={year} onChange={handleYearChange}>
        {releaseYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <label htmlFor='youtubePageLink' className='uppercase font-bold'>
        YouTube Link (Plain):
      </label>
      <input
        type='text'
        name='youtubePageLink'
        value={youtubePageLink}
        onChange={(e) => setYoutubePageLink(e.target.value)}
        className='w-4/5'
        required
      />

      <label htmlFor='' className='uppercase font-bold'>
        YouTube Embed Link:
      </label>
      <input
        type='text'
        name=''
        value={youtubeEmbedLink}
        onChange={(e) => setYoutubeEmbedLink(e.target.value)}
        className='w-4/5 mb-0'
        required
      />
      <p className='mb-8 text-gray-600 italic'>
        On YouTube video page, click <span className='font-bold'>Share</span>,
        then <span className='font-bold'>Embed</span>, and then copy link from
        src=&quot;<span className='font-bold'>...youtube.com/embed...</span>
        &quot;.
      </p>

      <input
        type='file'
        name='media'
        accept='image/jpeg, image/png'
        onChange={handleChange}
      />
      {fileUrl && file && (
        <img src={fileUrl} alt='preview of selected file' className='w-24' />
      )}
      <button
        type='submit'
        className={`uppercase mx-auto mt-5 mb-2 w-28 h-10 bg-green-400 rounded-lg hover:bg-green-500 hover:cursor-pointer shadow-md text-lg block ${oswald.className}`}
      >
        {userSubmitted ? <BeatLoader size={12} /> : 'Add Video'}
      </button>
    </form>
  );
}
