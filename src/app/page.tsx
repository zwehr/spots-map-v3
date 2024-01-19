import NumberCountUp from '@/components/animation/NumberCountUp';
import ImageGrid from '@/components/homepage/ImageGrid';

export default function Home() {
  return (
    <>
      <h1 className='hidden'>Home</h1>
      <ImageGrid></ImageGrid>
      <h2 className='my-8'>
        A collection of <NumberCountUp count={123} /> spots.
      </h2>
    </>
  );
}
