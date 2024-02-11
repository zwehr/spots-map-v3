'use client';

import { FormEvent, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { oswald } from '@/app/fonts';
import { insertVideo } from './actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddVideoForm() {
  const [title, setTitle] = useState<string>('');
  const [company, setCompany] = useState<string | null>(null);
  const [year, setYear] = useState<number>(2024);
  const [youtubePageLink, setYoutubePageLink] = useState<string>('');
  const [youtubeEmbedLink, setYoutubeEmbedLink] = useState<string>('');
  const [userSubmitted, setUserSubmitted] = useState(false);

  const releaseYears = Array.from({ length: 45 }, (_, index) => 2024 - index); // 2024 to 1980 for select options

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value, 10);
    setYear(selectedValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setUserSubmitted(true);
    e.preventDefault();

    insertVideo(title, company, year, youtubePageLink, youtubeEmbedLink)
      .then((response) => {
        if (response !== undefined) {
          if ('error' in response) {
            console.error(response.error);
          } else {
            console.log(response.data);
            showSuccessToast();
          }
        } else {
          console.error('Response is undefined');
        }

        setUserSubmitted(false);
      })
      .catch((error) => {
        console.error('Error occurred:', error);
        setUserSubmitted(false);
      });
  };

  const clearInputs = () => {
    setTitle('');
    setCompany(null);
    setYear(2024);
    setYoutubePageLink('');
    setYoutubeEmbedLink('');
  };

  const showSuccessToast = () => {
    toast.success('Success Notification !', {});
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
        src="<span className='font-bold'>...youtube.com/embed...</span>".
      </p>

      <button
        className={`uppercase mx-auto mt-5 mb-2 w-28 h-10 bg-green-400 rounded-lg hover:bg-green-500 hover:cursor-pointer shadow-md text-lg block ${oswald.className}`}
      >
        {userSubmitted ? <BeatLoader size={12} /> : 'Add Video'}
      </button>
    </form>
  );
}
