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
        <div className='recent-spots-container w-1/4 m-4 bg-slate-100 rounded-md shadow-md'>
          <h2 className='text-left'>Recent Spots</h2>
          <div className='recent-spots ml-4 mr-2 my-4 rounded-lg'>
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
        <div className='descriptions-container w-3/4'>
          <div className='what-we-offer mr-4 my-4 p-1 rounded-lg bg-slate-100 shadow-md bg-gradient-to-r from-slate-100 to-green-100'>
            <h2 className='text-left p-1'>
              A collection of <NumberCountUp count={123} /> spots, and more...
            </h2>
            <ul className='ml-4'>
              <li className='flex m-2'>
                <FaSearch />
                <p className={`pl-1 ${merriweather.className}`}>
                  Robust tagging and search system. Blah blah blah blah blah
                  blah blah blah blah blah blah blah...
                </p>
              </li>
              <li className='flex m-2'>
                <FaYoutube />
                <p className={`pl-1 ${merriweather.className}`}>
                  Weekly additions from the newest video releases. Blah blah
                  blah blah blah blah blah blah blah blah...
                </p>
              </li>
              <li className='flex m-2'>
                <GiSkateboard />
                <p className={`pl-1 ${merriweather.className}`}>
                  Created and curated by skaters. Blah blah blah blah blah blah
                  blah blah blah blah blah blah blah...
                </p>
              </li>
              <li className='flex m-2'>
                <FaHeart />
                <p className={`pl-1 ${merriweather.className}`}>
                  Save your favorite spots. Blah blah blah blah blah blah blah
                  blah blah...
                </p>
              </li>
            </ul>
          </div>
          <div className='what-we-offer ml-2 mr-4 my-4 p-1 rounded-lg bg-gradient-to-r from-blue-100 to-slate-100 shadow-md'>
            <h2 className='text-left'>More info...</h2>
            <p className='p-4'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              vel felis lobortis, pulvinar nunc non, sagittis turpis. Morbi
              faucibus lobortis dolor ac commodo. Quisque risus metus, maximus
              ut nulla at, tristique scelerisque nisl. In in ultrices mi.
              Maecenas molestie consectetur ipsum, a vestibulum magna porttitor
              tempor. Sed eget lacinia mi, ut vulputate est. Nunc nec tincidunt
              sapien, ut blandit dolor. Integer malesuada ante eget congue
              hendrerit. Nullam aliquet, leo a ullamcorper molestie, nunc purus
              sollicitudin purus, at accumsan neque est id eros. In et metus
              eget sem tincidunt imperdiet sed ac ante. Mauris sit amet congue
              arcu. Fusce quis neque fringilla, tristique orci quis, dictum leo.
              Phasellus et leo quis ipsum facilisis interdum sit amet vitae
              libero. Nullam pulvinar fringilla sapien quis mattis. Nam cursus
              porttitor nulla, id laoreet nibh ultrices nec. Curabitur purus
              lorem, scelerisque a pretium eu, pretium id augue. Donec ac
              accumsan arcu. In rutrum tristique aliquet. Maecenas pharetra diam
              ut metus viverra, eu ultrices odio ultricies. Ut posuere lectus
              quis risus molestie, at lacinia leo placerat. Maecenas sapien
              enim, luctus et tellus sed, faucibus bibendum justo. Fusce
              imperdiet mauris a est aliquam, vel ullamcorper eros faucibus.
              Integer sit amet ante rutrum, tincidunt quam porttitor, efficitur
              ex. Cras rutrum lacinia lobortis. Vestibulum eu tortor lorem.
              Mauris a venenatis nisl. Vivamus eget sem tincidunt, efficitur
              purus non, vulputate turpis. In eleifend porta dui sed commodo.
              Nunc ullamcorper lorem et nunc eleifend tristique. Nam cursus erat
              mauris, et porttitor nisl pretium nec. Pellentesque in tellus non
              elit venenatis maximus ac et lorem. Etiam commodo augue leo, sit
              amet molestie arcu semper nec.
            </p>
          </div>
          <div className='what-we-offer ml-2 mr-4 my-4 p-1 rounded-lg border- bg-gradient-to-r from-yellow-300 to-amber-500 shadow-md'>
            <div className='bg-slate-100 ml-2 mb-2 mr-2 rounded-md'>
              <h2 className='text-left p-2'>Premium</h2>
              <p className='p-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas vel felis lobortis, pulvinar nunc non, sagittis turpis.
                Morbi faucibus lobortis dolor ac commodo. Quisque risus metus,
                maximus ut nulla at, tristique scelerisque nisl. In in ultrices
                mi. Maecenas molestie consectetur ipsum, a vestibulum magna
                porttitor tempor. Sed eget lacinia mi, ut vulputate est. Nunc
                nec tincidunt sapien, ut blandit dolor. Integer malesuada ante
                eget congue hendrerit. Nullam aliquet, leo a ullamcorper
                molestie, nunc purus sollicitudin purus, at accumsan neque est
                id eros. In et metus eget sem tincidunt imperdiet sed ac ante.
                Mauris sit amet congue arcu. Fusce quis neque fringilla,
                tristique orci quis, dictum leo. Phasellus et leo quis ipsum
                facilisis interdum sit amet vitae libero. Nullam pulvinar
                fringilla sapien quis mattis. Nam cursus porttitor nulla, id
                laoreet nibh ultrices nec. Curabitur purus lorem, scelerisque a
                pretium eu, pretium id augue. Donec ac accumsan arcu. In rutrum
                tristique aliquet. Maecenas pharetra diam ut metus viverra, eu
                ultrices odio ultricies. Ut posuere lectus quis risus molestie,
                at lacinia leo placerat. Maecenas sapien enim, luctus et tellus
                sed, faucibus bibendum justo. Fusce imperdiet mauris a est
                aliquam, vel ullamcorper eros faucibus. Integer sit amet ante
                rutrum, tincidunt quam porttitor, efficitur ex. Cras rutrum
                lacinia lobortis. Vestibulum eu tortor lorem. Mauris a venenatis
                nisl. Vivamus eget sem tincidunt, efficitur purus non, vulputate
                turpis. In eleifend porta dui sed commodo. Nunc ullamcorper
                lorem et nunc eleifend tristique. Nam cursus erat mauris, et
                porttitor nisl pretium nec. Pellentesque in tellus non elit
                venenatis maximus ac et lorem. Etiam commodo augue leo, sit amet
                molestie arcu semper nec.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
