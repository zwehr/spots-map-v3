import Link from 'next/link';
import supabase from '@/lib/utils/supabase';
import AsyncSelect from 'react-select/async';
import { merriweather } from '@/app/fonts';
import { City } from 'country-state-city';

export default async function ImageGrid() {
  const { data: tileSpots } = await supabase
    .from('spots')
    .select('id, image_thumbnail_link')
    .order('id', { ascending: true })
    .range(0, 44);

  const citiesList = City.getAllCities();

  const cityOptions = citiesList.map((city) => ({
    label: city.name,
    value: { latitude: city.latitude, longitude: city.longitude },
  }));

  const getVideoTitles = async (query: string) => {
    const { data, error } = await supabase
      .from('videos')
      .select('id, title')
      .filter('title', 'ilike', `%${query}%`)
      .limit(5);
    console.log(data);
    return data;
  };

  //const loadOptions = async (inputValue: string) => {
  //const cityNames = await getVideoTitles(inputValue);

  // Map response data to format expected by AsyncSelect
  //const options = videoTitles!.map((item) => ({
  //label: item.title,
  //value: item.id,
  //}));

  //return options;
  //};

  return (
    <div className='grid grid-cols-9 grid-rows-5 gap-1 p-4'>
      <div className='absolute w-96 mx-auto mt-24 left-0 right-0 bg-blur-md bg-white/95 rounded-lg text-center z-10'>
        <p className='uppercase text-center text-4xl my-8'>Find Spots</p>
        <input
          type='text'
          placeholder='Enter a city...'
          className={`mx-auto my-6 bg-slate-100 border border-slate-300 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 ${merriweather.className}`}
        ></input>
        {/* <AsyncSelect cacheOptions loadOptions={cityOptions} defaultOptions /> */}
        <button
          className='uppercase text-lg text-slate-200 bg-emerald-600 hover:bg-emerald-700 w-24 rounded-md p-2 mb-3'
          disabled
        >
          Go!
        </button>
      </div>

      {tileSpots &&
        tileSpots.map((spot) => (
          <div
            key={spot.id}
            className='bg-slate-200 rounded-md hover:bg-slate-300'
          >
            <Link href={`/spot/${spot.id}`}>
              <img
                className='rounded-sm opacity-50 hover:opacity-100 transition-all duration-200'
                src={spot.image_thumbnail_link}
                width={400}
                height={300}
                alt='Skatespot photo'
              />
            </Link>
          </div>
        ))}
    </div>
  );
}
