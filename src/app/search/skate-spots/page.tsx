import SearchMapListContainer from '@/components/map/SearchMapListContainer';

type SpotsListParams = {
  query: string;
  city: string;
};

export default async function SpotsList({
  searchParams,
}: {
  searchParams: SpotsListParams | null;
}) {
  const params = searchParams;

  if (params) {
    console.log(params.city);
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <h1 className='uppercase'>Search</h1>
      <SearchMapListContainer
        paramQuery={params ? params.query : ''}
        paramCity={params ? params.city : ''}
      />
    </div>
  );
}
