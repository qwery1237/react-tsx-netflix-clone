import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useScreenSize from '../hooks/useScreenSize';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../api';
import { getOffset, makeImgPath } from '../utils';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import Movie, { IMovieProps } from './Movie';

const SliderWrapper = styled.div`
  width: 100%;
  position: relative;
  top: -15vw;
`;
const SliderTitle = styled.div`
  margin-bottom: 2vw;
  margin: ${(props) => props.theme.paddingContainer};
  font-size: 1.8vw;
  font-weight: 500;
`;
const SliderAnimationWrapper = styled.div<{ height: number }>`
  margin-top: 1.2vw;
  width: 100%;
  position: relative;
  height: ${(props) => props.height + 'px'};
`;
const Row = styled(motion.div)`
  display: flex;
  position: absolute;
  width: 100%;
  padding: ${(props) => props.theme.paddingContainer};
  overflow: hidden;
  gap: 0.5vw;
`;
const PrevMovie = styled(motion.div)<IMovieProps>`
  width: ${(props) => props.width + 'px'};
  height: ${(props) => (props.width / 11) * 6 + 'px'};
  border-radius: 0.2rem;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.bgImg});
  position: absolute;
  right: 96.5vw;
  background-image: url(${(props) => props.bgImg});
`;
const NextMovie = styled(PrevMovie)`
  position: absolute;
  left: 96.5vw;
  background-image: url(${(props) => props.bgImg});
`;
const SlideBtn = styled(motion.button)<{ textAlign: string }>`
  position: relative;
  z-index: 2;
  width: 3.5vw;
  height: 100%;
  ${(props) =>
    props.textAlign === 'left'
      ? 'right:0;  border-top-left-radius:0.2rem ; border-bottom-left-radius: 0.2rem;'
      : 'border-top-right-radius:0.2rem ; border-bottom-right-radius: 0.2rem;'};
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 3vw;
  text-align: ${(props) => props.textAlign};
  transition: all ease-in-out 0.1s;
  svg {
    transition: all ease-in-out 0.1s;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);

    svg {
      transform: scale(1.3);
    }
  }
`;
const slideVariants = {
  hidden: (direction: string) => {
    return {
      x: direction === 'right' ? window.outerWidth : -window.outerWidth,
    };
  },
  visible: {
    x: 0,
  },
  exit: (direction: string) => {
    return {
      x: direction === 'right' ? -window.outerWidth : window.outerWidth,
    };
  },
};

export default function Slider() {
  const { data: movies } = useQuery({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: getMovies,
  });
  const { width } = useScreenSize();
  const [offset, setOffset] = useState(0);
  const [showPrev, setShowPrev] = useState(false);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');
  const [leaving, setLeaving] = useState(false);

  const toggleBtn = () => setShowBtn((prev) => !prev);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const increaseIndex = () => {
    !showPrev && setShowPrev(true);
    if (leaving) return;
    toggleLeaving();
    setFirstIndex((prev) => (prev + offset) % maxIndex);
    setLastIndex((prev) => (prev + offset) % maxIndex);
  };
  const decreaseIndex = () => {
    if (leaving) return;
    toggleLeaving();
    setFirstIndex((prev) => (prev - offset + maxIndex) % maxIndex);
    setLastIndex((prev) => (prev - offset + maxIndex) % maxIndex);
  };

  useEffect(() => {
    const newOffset = getOffset(width);
    offset !== newOffset && setOffset(newOffset);
  }, [width]);
  useEffect(() => {
    if (!movies) return;
    setLastIndex((firstIndex + offset - 1) % movies.length);
  }, [offset, firstIndex, movies]);

  if (!movies) {
    return <></>;
  }

  const maxIndex = movies.length;
  const displayMovies =
    firstIndex < lastIndex
      ? movies.slice(firstIndex, firstIndex + offset)
      : [
          ...movies.slice(firstIndex, maxIndex),
          ...movies.slice(0, lastIndex + 1),
        ];

  return (
    <SliderWrapper onMouseEnter={toggleBtn} onMouseLeave={toggleBtn}>
      <SliderTitle>Now Playing</SliderTitle>

      <SliderAnimationWrapper height={(width / offset / 11) * 6}>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            key={displayMovies[0].id}
            custom={slideDirection}
            variants={slideVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ type: 'tween', duration: 0.5 }}
          >
            {showPrev && (
              <PrevMovie
                width={width / offset}
                bgImg={makeImgPath(
                  movies[firstIndex === 0 ? movies.length - 1 : firstIndex - 1]
                    .backdrop_path
                )}
              />
            )}
            {displayMovies.map((movie, i) => (
              <Movie
                key={movie.id + i}
                width={width / offset}
                bgImg={makeImgPath(movie.backdrop_path)}
                movie={movie}
              />
            ))}
            <NextMovie
              width={width / offset}
              bgImg={makeImgPath(
                movies[
                  firstIndex + offset >= movies.length ? 0 : firstIndex + offset
                ].backdrop_path
              )}
            />
          </Row>
        </AnimatePresence>
        {showPrev && (
          <SlideBtn
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0, delay: 0.6 }}
            textAlign='right'
            onClick={decreaseIndex}
            onMouseEnter={() => {
              setSlideDirection('left');
            }}
          >
            {showBtn ? <FaChevronLeft /> : null}
          </SlideBtn>
        )}
        <SlideBtn
          textAlign='left'
          onClick={increaseIndex}
          onMouseEnter={() => {
            setSlideDirection('right');
          }}
        >
          {showBtn ? <FaChevronRight /> : null}
        </SlideBtn>
      </SliderAnimationWrapper>
    </SliderWrapper>
  );
}
