import SearchMapListContainer from '@/components/map/SearchMapListContainer';

export default async function SpotsList() {
  return (
    <div className='max-w-6xl mx-auto'>
      <h1 className='uppercase'>Search</h1>

      <SearchMapListContainer />
    </div>
  );
}
