import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import styled from 'styled-components';
import Image from 'next/image';

const images = [
  'https://contents.lotteon.com/itemimage/_v031902/LM/88/09/84/92/61/24/3_/00/1/LM8809849261243_001_1.jpg/dims/resizef/720X720',
  'https://mblogthumb-phinf.pstatic.net/MjAxOTExMzBfMTE2/MDAxNTc1MDg5MDk0ODU3.1pokY3_09oFD9snX2vLZucB_ZnkqS_eZRELPIVbSCUYg.ll-GyAeG5dLfIwY2gnjNREhxpcQTtbfMjt3bP39rPOQg.JPEG.hanee218/1575089095312.jpeg?type=w800',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_iqbo4mgOKmZTU_tZNcVGAkSz0P7zW3m2cQ&usqp=CAU',
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

function Slider() {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <Wrapper>
      <AnimatePresence initial={false} custom={direction}>
        <ImgWrapper>
          <motion.img
            key={page}
            src={images[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        </ImgWrapper>
      </AnimatePresence>
      <NextArrow className="next" onClick={() => paginate(1)}>
        <Image
          src={'static/icons/interface-arrows-button-right.svg'}
          width={25}
          height={40}
          alt={'right'}
        />
      </NextArrow>
      <PrevArrow className="prev" onClick={() => paginate(-1)}>
        <Image
          src={'static/icons/interface-arrows-button-left.svg'}
          width={25}
          height={40}
          alt={'left'}
        />
      </PrevArrow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 35px 0;
  position: relative;
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 478px;
  border-radius: 50px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  height: fit-content;

  color: #fff;

  cursor: pointer;
`;

const PrevArrow = styled(Arrow)`
  left: -35px;

  @media (max-width: 768px) {
    left: 10px;
  }
`;

const NextArrow = styled(Arrow)`
  right: -35px;
  @media (max-width: 768px) {
    right: 10px;
  }
`;

export default Slider;
