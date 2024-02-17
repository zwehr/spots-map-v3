'use client';

import { useState } from 'react';
import { getSignedURL } from './actions';

export default function AddVideoForm() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [userSubmitted, setUserSubmitted] = useState<boolean>(false);

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

        const url = signedURLResult.success.url;
        await fetch(url, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
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
      <input
        type='file'
        name='media'
        accept='image/jpeg, image/png'
        onChange={handleChange}
      />
      {fileUrl && file && (
        <img src={fileUrl} alt='preview of selected file' className='w-24' />
      )}
      <button type='submit' className='bg-green-500 p-2 rounded'>
        Post
      </button>
    </form>
  );
}
