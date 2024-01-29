import NumberCountUp from '@/components/animation/NumberCountUp';
import ImageGrid from '@/components/homepage/ImageGrid';
import Image from 'next/image';
import { FaHeart, FaSearch, FaYoutube } from 'react-icons/fa';
import { GiSkateboard } from 'react-icons/gi';
import { merriweather } from './fonts';

export default function Home() {
  return (
    <div className='max-w-screen-xl mx-auto my-4 shadow-lg'>
      <h1 className='hidden'>Home</h1>
      <ImageGrid></ImageGrid>
      <div className='recent-and-descriptions mt-4 flex'>
        <div className='recent-spots-container w-1/3'>
          <h2 className='text-left'>Recent Spots</h2>
          <div className='recent-spots ml-4 mr-2 my-4 rounded-lg overflow-scroll bg-slate-50 shadow-md'>
            <div>
              <div className='m-2'>
                <h3>Spot Name in City Name</h3>
                <Image
                  className='rounded-md'
                  src='/handrail.jpeg'
                  width={500}
                  height={500}
                  alt='Skatespot photo'
                />
              </div>
            </div>
            <div>
              <div className='m-2'>
                <h3>Spot Name in City Name</h3>
                <Image
                  className='rounded-md'
                  src='/handrail.jpeg'
                  width={500}
                  height={500}
                  alt='Skatespot photo'
                />
              </div>
            </div>
            <div>
              <div className='m-2'>
                <h3>Spot Name in City Name</h3>
                <Image
                  className='rounded-md'
                  src='/handrail.jpeg'
                  width={500}
                  height={500}
                  alt='Skatespot photo'
                />
              </div>
            </div>
            <div>
              <div className='m-2'>
                <h3>Spot Name in City Name</h3>
                <Image
                  className='rounded-md'
                  src='/handrail.jpeg'
                  width={500}
                  height={500}
                  alt='Skatespot photo'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='descriptions-container w-2/3'>
          <div className='what-we-offer ml-2 mr-4 my-4 rounded-lg bg-slate-50 shadow-md'>
            <h2 className='text-left'>
              A collection of <NumberCountUp count={123} /> spots, and more...
            </h2>
            <ul className='ml-4'>
              <li className='flex m-2'>
                <FaSearch />
                <p className={`pl-1 ${merriweather.className}`}>
                  Robust tagging and search system.
                </p>
              </li>
              <li className='flex m-2'>
                <FaYoutube />
                <p className={`pl-1 ${merriweather.className}`}>
                  Weekly additions from the newest video releases.
                </p>
              </li>
              <li className='flex m-2'>
                <GiSkateboard />
                <p className={`pl-1 ${merriweather.className}`}>
                  Created and curated by skaters.
                </p>
              </li>
              <li className='flex m-2'>
                <FaHeart />
                <p className={`pl-1 ${merriweather.className}`}>
                  Save your favorite spots.
                </p>
              </li>
            </ul>
          </div>
          <div className='what-we-offer ml-2 mr-4 my-4 rounded-lg bg-slate-50 shadow-md'>
            <h2 className='text-left'>
              A collection of <NumberCountUp count={123} /> spots, and more...
            </h2>
            <ul className='ml-4'>
              <li className='flex m-2'>
                <FaSearch />
                <p className={`pl-1 ${merriweather.className}`}>
                  Robust tagging and search system.
                </p>
              </li>
              <li className='flex m-2'>
                <FaYoutube />
                <p className={`pl-1 ${merriweather.className}`}>
                  Weekly additions from the newest video releases.
                </p>
              </li>
              <li className='flex m-2'>
                <GiSkateboard />
                <p className={`pl-1 ${merriweather.className}`}>
                  Created and curated by skaters.
                </p>
              </li>
              <li className='flex m-2'>
                <FaHeart />
                <p className={`pl-1 ${merriweather.className}`}>
                  Save your favorite spots.
                </p>
              </li>
            </ul>
          </div>
          <div className='what-we-offer ml-2 mr-4 my-4 rounded-lg bg-slate-50 shadow-md'>
            <h2 className='text-left'>
              A collection of <NumberCountUp count={123} /> spots, and more...
            </h2>
            <ul className='ml-4'>
              <li className='flex m-2'>
                <FaSearch />
                <p className={`pl-1 ${merriweather.className}`}>
                  Robust tagging and search system.
                </p>
              </li>
              <li className='flex m-2'>
                <FaYoutube />
                <p className={`pl-1 ${merriweather.className}`}>
                  Weekly additions from the newest video releases.
                </p>
              </li>
              <li className='flex m-2'>
                <GiSkateboard />
                <p className={`pl-1 ${merriweather.className}`}>
                  Created and curated by skaters.
                </p>
              </li>
              <li className='flex m-2'>
                <FaHeart />
                <p className={`pl-1 ${merriweather.className}`}>
                  Save your favorite spots.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
