import styled from 'styled-components';
import { IMovie, ITVShow } from '../api';
import { makeImgPath } from '../utils';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { motion } from 'framer-motion';

interface Iprops {
  boxWidth: number;
  video?: IMovie | ITVShow;
  pointerEventExist?: boolean;
  contentExist?: boolean;
  index?: number;
  offset?: number;
}
interface IBoxProps {
  boxWidth: number;
  pointerEventExist?: boolean;
  contentExist?: boolean;
  index?: number;
  offset?: number;
}
const Box = styled(motion.div)<IBoxProps>`
  width: ${(props) => props.boxWidth + 'px'};
  cursor: pointer;
  ${(props) => (props.pointerEventExist ? '' : 'pointer-events: none;')}
  ${(props) => (props.contentExist ? '' : 'opacity:0;')}
  ${(props) => {
    switch (props.index) {
      case 0:
        return 'transform-origin: center left;';
      case props.offset && props.offset - 1:
        return 'transform-origin: center right;';
    }
  }}
  height: fit-content;
  overflow: hidden;
  border-radius: 3px;
`;
const VideoImg = styled(motion.div)<{ bgImg?: string }>`
  width: 100%;
  aspect-ratio: 11/6;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.bgImg});
`;
const Info = styled(motion.div)`
  width: 100%;
  padding: 1rem;
  opacity: 0;
  display: none;

  background-color: ${(props) => props.theme.black.darker};
`;
const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 18%;
`;
const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3vw;
  padding: 2px;
  border-radius: 50%;
  border: solid 1.5px rgba(255, 255, 255, 0.5);

  &:hover {
    cursor: pointer;
    border-color: ${(props) => props.theme.white.darker};
  }
  @media (min-width: 800px) {
    font-size: 2vw;
  }
`;
const Title = styled.span`
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;
const Rating = styled.div`
  color: #46d369;
  margin: 0.3vw 0;
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;

const containerVariants = {
  hover: {
    borderRadius: '6px',
    scale: 1.4,
    y: -60,
    boxShadow: 'rgba(0, 0, 0, 0.75) 0px 3px 10px',
    minWidth: '150px',
    transition: { delay: 0.3 },
  },
};
const imgVariants = {
  hover: {
    borderRadius: '6px 6px 0 0',
    transition: { delay: 0.3 },
  },
};
const infoVariants = {
  hover: {
    display: 'block',
    opacity: 1,
    borderRadius: '0 0 6px 6px',
    transition: { delay: 0.3 },
  },
};
export default function Video({
  video,
  boxWidth,
  pointerEventExist,
  contentExist,
  index,
  offset,
}: Iprops) {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const onClick = async () => {
    navigate(String(`${pathname}?videoId=${video?.id}`), {
      state: { genre: (video as IMovie).title ? 'movie' : 'tv' },
    });
  };

  return (
    <>
      {contentExist ? (
        <Box
          ref={videoRef}
          boxWidth={boxWidth}
          pointerEventExist={pointerEventExist}
          contentExist={contentExist}
          variants={containerVariants}
          whileHover='hover'
          transition={{ type: 'tween', duration: 0.2 }}
          index={index}
          offset={offset}
        >
          <VideoImg
            variants={imgVariants}
            transition={{ type: 'tween', duration: 0.2 }}
            bgImg={makeImgPath(video?.backdrop_path || '')}
          />
          <Info
            variants={infoVariants}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            <BtnWrapper>
              <Btn onClick={onClick}>
                <MdKeyboardArrowDown />
              </Btn>
            </BtnWrapper>
            <Rating>{video?.vote_average.toFixed(1)}/10</Rating>
            <Title>{(video as IMovie).title || (video as ITVShow).name}</Title>
          </Info>
        </Box>
      ) : (
        <Box
          boxWidth={boxWidth}
          pointerEventExist={pointerEventExist}
          contentExist={contentExist}
        />
      )}
    </>
  );
}
