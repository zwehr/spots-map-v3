'use client';

import { useSpring, animated } from 'react-spring';

type NumberCountUpProps = {
  count: number;
};

export default function NumberCountUp({ count }: NumberCountUpProps) {
  const { number } = useSpring({
    from: { number: 0 }, // starting counting from this number
    number: count, // end with count from props
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return (
    <animated.div className='inline'>
      {number.to((n) => n.toFixed(0))}
    </animated.div>
  );
}
