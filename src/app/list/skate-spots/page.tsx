import { useState } from 'react';
import { merriweather } from '../../fonts';
import SearchMapListContainer from '@/components/map/SearchMapListContainer';

export default async function SpotsList() {
  return (
    <div className='max-w-6xl mx-auto'>
      <h1 className='uppercase'>List and Search</h1>

      <SearchMapListContainer />
    </div>
  );
}
