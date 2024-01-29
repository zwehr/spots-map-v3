import Image from 'next/image';
import { Database } from '../../../types/supabase';

type ImageUrlsProps =
  Database['public']['Tables']['spots']['Row']['image_links'];

export default function SpotImage({ images }: { images: ImageUrlsProps }) {
  if (images) {
    return <img alt='picture of current skate spot' src={images[0]} />;
  }
}

/*
export default function SpotImage({ images }: ImageUrlsProps) {
  return (
    <Image
      alt='picture of current skate spot'
      src={images[0]}
      width={0}
      height={0}
      sizes='100vw'
      style={{ width: '100%', height: 'auto' }} // optional
    />
  );
}
*/
