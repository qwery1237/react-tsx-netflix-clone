import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getMovies } from '../api';
import { makeImgPath } from '../utils';
import { SiNetflix } from 'react-icons/si';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useScreenSize from '../hooks/useScreenSize';

interface IMovieProps {
  bgImg: string;
  width: number;
}

const Container = styled.div``;
const Banner = styled.div<{ bgImg: string }>`
  width: 100vw;
  height: 56.25vw;
  padding: ${(props) => props.theme.paddingContainer};
  background-image: linear-gradient(rgba(20, 20, 20, 0), rgba(20, 20, 20, 1)),
    url(${(props) => props.bgImg});
  background-size: cover;
  background-position: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const TitleWrapper = styled(motion.div)`
  transform-origin: bottom left;
`;
const TitleLogo = styled(motion.div)`
  font-size: 2vw;
  letter-spacing: 0.5vw;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: #c2c3c2;
  svg {
    width: 1.5em;
    height: 1.5em;
    fill: ${(props) => props.theme.red};
  }
`;
const Title = styled.h1`
  font-size: 6vw;
  font-weight: 500;
`;
const Overview = styled(motion.p)`
  font-size: 1.2vw;
  width: 45%;
`;
const SliderWrapper = styled.div`
  width: 100%;
  position: relative;
  top: -10vw;
`;
const SliderTitle = styled.div`
  margin: ${(props) => props.theme.paddingContainer};
  font-size: 1.4vw;
  font-weight: 500;
`;
const SliderAnimationWrapper = styled.div<{ height: number }>`
  width: 100%;
  position: relative;
  height: ${(props) => props.height + 'px'};
`;
const Slider = styled(motion.div)`
  display: flex;
  position: absolute;
  width: 100%;
  padding: ${(props) => props.theme.paddingContainer};
  overflow: hidden;
  gap: 0.5vw;
`;
const Movie = styled(motion.div)<IMovieProps>`
  width: ${(props) => props.width + 'px'};
  height: ${(props) => (props.width / 4) * 3 + 'px'};
  border-radius: 0.2rem;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.bgImg});
`;
const PrevMovie = styled(Movie)`
  position: absolute;
  right: 96.5vw;
  background-image: url(${(props) => props.bgImg});
`;
const NextMovie = styled(Movie)`
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

export default function Home() {
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
    if (width > 1399) {
      if (offset === 6) return;
      setOffset(6);
    } else if (width > 1099) {
      if (offset === 5) return;
      setOffset(5);
    } else if (width > 799) {
      if (offset === 4) return;
      setOffset(4);
    } else if (width > 499) {
      if (offset === 3) return;
      setOffset(3);
    } else {
      if (offset === 2) return;
      setOffset(2);
    }
  }, [width]);
  useEffect(() => {
    if (!movies) return;
    setLastIndex((firstIndex + offset - 1) % movies.length);
  }, [offset, firstIndex, movies]);

  if (!movies) {
    return <></>;
  }
  const banner = movies[0];
  const maxIndex = movies.length;

  const displayMovies =
    firstIndex < lastIndex
      ? movies.slice(firstIndex, firstIndex + offset)
      : [
          ...movies.slice(firstIndex, maxIndex),
          ...movies.slice(0, lastIndex + 1),
        ];

  return (
    <Container>
      <Banner bgImg={makeImgPath(banner.backdrop_path)}>
        <TitleWrapper
          initial={{ scale: 1 }}
          animate={{ scale: 0.5 }}
          transition={{ delay: 4, duration: 0.3 }}
        >
          <TitleLogo>
            <SiNetflix />
            SERIES
          </TitleLogo>
          <Title>{banner.title.toUpperCase()}</Title>
        </TitleWrapper>
        <Overview
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: '25px' }}
          transition={{ delay: 4, duration: 0.3 }}
        >
          {banner.overview}
        </Overview>
      </Banner>
      <SliderWrapper onMouseEnter={toggleBtn} onMouseLeave={toggleBtn}>
        <SliderTitle>Now Playing</SliderTitle>

        <SliderAnimationWrapper height={(width / offset / 4) * 3}>
          <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
            <Slider
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
                    movies[
                      firstIndex === 0 ? movies.length - 1 : firstIndex - 1
                    ].backdrop_path
                  )}
                />
              )}
              {displayMovies.map((movie, i) => (
                <Movie
                  key={movie.id + i}
                  layoutId={movie.id + ''}
                  width={width / offset}
                  bgImg={makeImgPath(movie.backdrop_path)}
                ></Movie>
              ))}
              <NextMovie
                width={width / offset}
                bgImg={makeImgPath(
                  movies[
                    firstIndex + offset >= movies.length
                      ? 0
                      : firstIndex + offset
                  ].backdrop_path
                )}
              />
            </Slider>
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
    </Container>
  );
}
