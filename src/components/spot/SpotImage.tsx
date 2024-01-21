import Image from 'next/image';

type ImageUrlsProps = {
  images: Array<string>;
};

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
