import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useScreenSize from '../hooks/useScreenSize';
import { getOffset, makeImgPath } from '../utils';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import Video, { IMovieCssProps } from './Video';
import { IMovie, ITVShow } from '../api';
import { useOutletContext } from 'react-router-dom';
import { IOutletContext } from '../App';
interface ISliderProps {
  videos: IMovie[] | ITVShow[];
  label: string;
  genre: string;
  isLastSlider: boolean;
}
const SliderWrapper = styled.div`
  width: 100%;
  margin-bottom: 3vw;
  position: relative;
  z-index: 1;
  top: -14vw;
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
  gap: 0.5vw;
`;
const PrevMovie = styled(motion.div)<IMovieCssProps>`
  width: ${(props) => props.width + 'px'};
  aspect-ratio: 11/6;
  border-radius: 3px;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.bgImg});
  position: absolute;
  right: 96.5vw;
  background-image: url(${(props) => props.bgImg});
`;
const NextMovie = styled(PrevMovie)`
  left: 96.5vw;
  background-image: url(${(props) => props.bgImg});
`;
const SlideBtn = styled(motion.button)<{ textAlign: string }>`
  position: relative;
  width: 3.5vw;
  height: 101%;
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
      x:
        direction === 'right'
          ? window.outerWidth * 0.94
          : -window.outerWidth * 0.94,
    };
  },
  visible: {
    x: 0,
  },
  exit: (direction: string) => {
    return {
      x:
        direction === 'right'
          ? -window.outerWidth * 0.94
          : window.outerWidth * 0.94,
    };
  },
};

export default function Slider({ videos, label, isLastSlider }: ISliderProps) {
  const { width } = useScreenSize();
  const { handleOutletRendered } = useOutletContext<IOutletContext>();
  const [offset, setOffset] = useState(0);
  const [showPrev, setShowPrev] = useState(false);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');
  const [leaving, setLeaving] = useState(false);

  const toggleBtn = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.zIndex === '2'
      ? (event.currentTarget.style.zIndex = '1')
      : (event.currentTarget.style.zIndex = '2');

    setShowBtn((prev) => !prev);
  };
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
    if (!isLastSlider) return;
    handleOutletRendered(true);
  }, []);
  useEffect(() => {
    const newOffset = getOffset(width);
    offset !== newOffset && setOffset(newOffset);
  }, [width]);
  useEffect(() => {
    if (!videos) return;
    setLastIndex((firstIndex + offset - 1) % videos.length);
  }, [offset, firstIndex, videos]);

  const maxIndex = videos.length;
  const displayVideos =
    videos.length <= offset
      ? videos
      : firstIndex < lastIndex
      ? videos.slice(firstIndex, firstIndex + offset)
      : [
          ...videos.slice(firstIndex, maxIndex),
          ...videos.slice(0, lastIndex + 1),
        ];
  if (!videos.length) return <></>;
  return (
    <SliderWrapper onMouseEnter={toggleBtn} onMouseLeave={toggleBtn}>
      <SliderTitle>{label}</SliderTitle>

      <SliderAnimationWrapper height={(width / offset / 11) * 6}>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            key={displayVideos[0].id}
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
                leaving={leaving}
                bgImg={makeImgPath(
                  videos[(firstIndex - 1 + videos.length) % videos.length]
                    .backdrop_path
                )}
              />
            )}
            {displayVideos.map((video, i) => (
              <Video
                key={video.id + i}
                width={width / offset}
                bgImg={makeImgPath(video.backdrop_path)}
                video={video}
                offset={offset}
                index={i}
              />
            ))}
            {offset < videos.length && (
              <NextMovie
                width={width / offset}
                leaving={leaving}
                bgImg={makeImgPath(
                  videos[(firstIndex + offset) % videos.length].backdrop_path
                )}
              />
            )}
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
        {offset < videos.length && (
          <SlideBtn
            textAlign='left'
            onClick={increaseIndex}
            onMouseEnter={() => {
              setSlideDirection('right');
            }}
          >
            {showBtn ? <FaChevronRight /> : null}
          </SlideBtn>
        )}
      </SliderAnimationWrapper>
    </SliderWrapper>
  );
}
