import NumberCountUp from '@/components/animation/NumberCountUp';
import ImageGrid from '@/components/homepage/ImageGrid';
import supabase from '@/lib/utils/supabase';
import Link from 'next/link';
import { FaHeart, FaSearch, FaYoutube } from 'react-icons/fa';
import { GiSkateboard } from 'react-icons/gi';
import { merriweather } from './fonts';

export default async function Home() {
  const { data: recentSpots } = await supabase
    .from('spots')
    .select('id, created_at, name, city, image_links')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className='max-w-screen-xl mx-auto my-4 shadow-lg'>
      <h1 className='hidden'>Home</h1>
      <ImageGrid></ImageGrid>
      <div className='recent-and-descriptions mt-4 flex'>
        <div className='recent-spots-container w-1/3 m-4 pt-4 bg-gray-100 rounded-md shadow-md'>
          <h2 className='uppercase text-center'>Recent Spots</h2>
          <div className='recent-spots ml-4 mr-2 my-4 rounded-lg'>
            {recentSpots &&
              recentSpots.map((spot) => (
                <Link href={`/spot/${spot.id}`} target='_blank'>
                  <div
                    key={spot.id}
                    className='relative mb-8 hover:text-sky-800 hover:underline'
                  >
                    <h3 className={merriweather.className}>{spot.name}</h3>
                    <img
                      className='rounded-md mt-1'
                      src={spot.image_links[0]}
                      width={500}
                      height={500}
                      alt='Skatespot photo'
                    />
                    <div className='absolute bottom-4 right-4 bg-gray-200 rounded-sm py-1 px-2 text-black'>
                      <p className='uppercase'>{spot.city}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <div className='descriptions-container w-2/3'>
          <div className='what-we-offer mr-4 my-4 p-1 rounded-lg shadow-md bg-gradient-to-b from-slate-100 to-blue-100'>
            <h2 className='uppercase text-center px-2 pt-4'>Features</h2>
            <ul className='ml-4'>
              <li className='p-2'>
                <h3
                  className={`pl-2 flex items-center ${merriweather.className}`}
                >
                  <FaSearch className='mr-2' />
                  Robust tagging and search system. Blah blah blah blah blah
                  blah blah blah blah blah blah blah...
                </h3>
              </li>
              <li className='p-2'>
                <h3
                  className={`pl-2 flex items-center ${merriweather.className}`}
                >
                  <FaYoutube className='mr-2' />
                  Weekly additions from the newest video releases. Blah blah
                  blah blah blah blah blah blah blah...
                </h3>
              </li>
              <li className='p-2'>
                <h3
                  className={`pl-2 flex items-center ${merriweather.className}`}
                >
                  <GiSkateboard className='mr-2' />
                  Created and curated by skaters. Blah blah blah blah blah blah
                  blah blah blah blah blah blah blah...
                </h3>
              </li>
              <li className='p-2'>
                <h3
                  className={`pl-2 flex items-center ${merriweather.className}`}
                >
                  <FaHeart className='mr-2' />
                  Save your favorite spots. Blah blah blah blah blah blah
                  blah...
                </h3>
              </li>
            </ul>
          </div>
          <div className='mr-4 my-4 p-1 rounded-lg border- bg-gradient-to-r from-yellow-300 to-amber-500 shadow-premiumGlow'>
            <div className='bg-slate-100 mb-1 mx-1 rounded-md'>
              <h2 className='uppercase text-center px-2 pt-4 mt-1'>Premium</h2>
              <p className={`px-6 py-2 ${merriweather.className}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas vel felis lobortis, pulvinar nunc non, sagittis turpis.
                Morbi faucibus lobortis dolor ac commodo. Quisque risus metus,
                maximus ut nulla at, tristique scelerisque nisl.In in ultrices
                mi. Maecenas molestie consectetur ipsum, a vestibulum magna
                porttitor tempor. Sed eget lacinia mi, ut vulputate est. Nunc
                nec tincidunt sapien, ut blandit dolor. Integer malesuada ante
                eget congue hendrerit. Nullam aliquet, leo a ullamcorper
                molestie, nunc purus sollicitudin purus, at accumsan neque est
                id eros. In et metus eget sem tincidunt imperdiet sed ac ante.
              </p>
              <p className={`px-6 py-2 ${merriweather.className}`}>
                Mauris sit amet congue arcu. Fusce quis neque fringilla,
                tristique orci quis, dictum leo. Phasellus et leo quis ipsum
                facilisis interdum sit amet vitae libero. Nullam pulvinar
                fringilla sapien quis mattis.
              </p>
              <p className='text-2xl text-center p-4'>
                <Link href='/premium' className='link'>
                  Learn more
                </Link>{' '}
                about Premium.
              </p>
            </div>
          </div>
          <div className='mr-4 my-4 p-1 rounded-lg bg-gradient-to-b from-slate-100 to-blue-100 shadow-md'>
            <h2 className='uppercase text-center px-2 pt-4'>More Info</h2>
            <p className={`px-6 py-2 ${merriweather.className}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              vel felis lobortis, pulvinar nunc non, sagittis turpis. Morbi
              faucibus lobortis dolor ac commodo. Quisque risus metus, maximus
              ut nulla at, tristique scelerisque nisl. In in ultrices mi.
              Maecenas molestie consectetur ipsum, a vestibulum magna porttitor
              tempor. Sed eget lacinia mi, ut vulputate est. Nunc nec tincidunt
              sapien, ut blandit dolor.
            </p>
            <p className={`px-6 py-2 ${merriweather.className}`}>
              Integer malesuada ante eget congue hendrerit. Nullam aliquet, leo
              a ullamcorper molestie, nunc purus sollicitudin purus, at accumsan
              neque est id eros. In et metus eget sem tincidunt imperdiet sed ac
              ante. Mauris sit amet congue arcu. Fusce quis neque fringilla,
              tristique orci quis, dictum leo. Phasellus et leo quis ipsum
              facilisis interdum sit amet vitae libero. Nullam pulvinar
              fringilla sapien quis mattis. Nam cursus porttitor nulla, id
              laoreet nibh ultrices nec. Curabitur purus lorem, scelerisque a
              pretium eu, pretium id augue. Donec ac accumsan arcu. In rutrum
              tristique aliquet. Maecenas pharetra diam ut metus viverra, eu
              ultrices odio ultricies. Ut posuere lectus quis risus molestie, at
              lacinia leo placerat. Maecenas sapien enim, luctus et tellus sed,
              faucibus bibendum justo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
