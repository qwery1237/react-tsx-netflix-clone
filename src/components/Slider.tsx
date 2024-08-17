import { useEffect, useState } from 'react';
import { IMovie, ITVShow } from '../api';
import { useOutletContext } from 'react-router-dom';
import { IOutletContext } from '../App';
import styled from 'styled-components';
import useScreenSize from '../hooks/useScreenSize';
import { getOffset } from '../utils';
import Video from './Video';

interface IProps {
  videos: IMovie[] | ITVShow[];
  label: string;
  genre: string;
  isLastSlider: boolean;
}
const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin-bottom: 3vw;
  position: relative;
  z-index: 1;
  top: -14vw;
`;
const Label = styled.h3`
  margin-bottom: 2vw;
  font-size: 1.8vw;
  font-weight: 500;
  padding: ${(props) => props.theme.paddingContainer};
`;
const SliderAnimationWrapper = styled.div<{ height: number }>`
  width: 100%;
  height: ${(props) => props.height + 'px'};
  display: flex;
  justify-content: center;
`;
const Row = styled.div<{ boxWidth: number }>`
  display: flex;
  gap: 4px;
  position: absolute;
`;

export default function Slider({ videos, label, genre, isLastSlider }: IProps) {
  const { width } = useScreenSize();
  const [offset, setOffset] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [showPrev, setShowPrev] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');
  const [leaving, setLeaving] = useState(false);
  const [displaySlide, setDisplaySlide] = useState<null | (IMovie | ITVShow)[]>(
    null
  );
  const { handleOutletRendered } = useOutletContext<IOutletContext>();
  const hasNext = videos.length > offset;
  const remainingSpace = hasNext
    ? 0
    : offset - (displaySlide as IMovie[] | ITVShow[])?.length;
  const toggleBtn = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.zIndex === '2'
      ? (event.currentTarget.style.zIndex = '1')
      : (event.currentTarget.style.zIndex = '2');

    setShowBtn((prev) => !prev);
  };
  const boxWidth = (width * 0.92 - 4 * (offset + 1)) / offset;
  const toggleLeaving = () => setLeaving((prev) => !prev);
  useEffect(() => {
    if (videos.length <= offset) {
      setDisplaySlide(videos);
      return;
    }
    if (startIndex + offset > videos.length) {
      const startIndexToLast = videos.slice(startIndex);
      const left = offset - startIndexToLast.length;
      const firstToEndIndex = videos.slice(0, left);
      const slide = [...startIndexToLast, ...firstToEndIndex];
      setDisplaySlide(slide);
      return;
    }
    const slide = videos.slice(startIndex, startIndex + offset);
    setDisplaySlide(slide);
  }, [videos, offset, startIndex]);
  useEffect(() => {
    if (!isLastSlider) return;

    handleOutletRendered(true);
  }, []);
  useEffect(() => {
    const newOffset = getOffset(width);
    offset !== newOffset && setOffset(newOffset);
  }, [width]);
  useEffect(() => {
    console.log(displaySlide, offset, hasNext);
  }, [displaySlide]);
  if (!videos.length || !displaySlide || !displaySlide.length) return <></>;
  return (
    <Wrapper onMouseEnter={toggleBtn} onMouseLeave={toggleBtn}>
      <Label>{label}</Label>
      <SliderAnimationWrapper height={(boxWidth * 6) / 11}>
        <Row boxWidth={boxWidth}>
          <Video
            boxWidth={boxWidth}
            video={videos[(startIndex - 1 + videos.length) % videos.length]}
            contentExist={showPrev}
          />
          {displaySlide.map((video, i) => (
            <Video
              boxWidth={boxWidth}
              video={video}
              pointerEventExist
              contentExist
              index={i}
              offset={offset}
            />
          ))}
          {remainingSpace
            ? [...Array(remainingSpace)].map((_, i) => (
                <Video key={'remainingSpace_' + i} boxWidth={boxWidth} />
              ))
            : null}
          <Video
            boxWidth={boxWidth}
            video={
              hasNext
                ? videos[(startIndex + offset) % videos.length]
                : undefined
            }
            contentExist={hasNext}
          />
        </Row>
      </SliderAnimationWrapper>
    </Wrapper>
  );
}
