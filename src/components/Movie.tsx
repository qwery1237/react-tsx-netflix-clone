import { motion } from 'framer-motion';
import styled from 'styled-components';
import { IMovie } from '../api';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface IMovieProps {
  bgImg: string;
  width: number;
  offset: number;
  movie: IMovie;
  index: number;
}
export interface IMovieCssProps {
  width: number;
  bgImg: string;
}
interface IContainerProps {
  width: number;
  offset: number;
  index: number;
}
const Container = styled(motion.div)<IContainerProps>`
  width: ${(props) => props.width + 'px'};

  ${(props) => {
    switch (props.index) {
      case 0:
        return 'transform-origin: center left;';
      case props.offset - 1:
        return 'transform-origin: center right;';
    }
  }}
  height:fit-content;
`;
const MovieImg = styled(motion.div)<IMovieCssProps>`
  width: 100%;
  border-radius: 3px;
  height: ${(props) => (props.width / 11) * 6 + 'px'};
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.bgImg});
`;
const Info = styled(motion.div)`
  width: 100%;
  padding: 1rem;
  opacity: 0;
  border-radius: 3px;
  background-color: ${(props) => props.theme.black.darker};
`;
const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 1rem;
`;
const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vw;
  padding: 2px;
  border-radius: 50%;
  border: solid 1.5px rgba(255, 255, 255, 0.5);
  &:hover {
    cursor: pointer;
    border-color: ${(props) => props.theme.white.darker};
  }
`;
const Title = styled.span``;
const Rating = styled.div`
  color: #46d369;
  margin: 0.3vw 0;
`;

const containerVariants = {
  hover: {
    scale: 1.2,
    y: -60,
    boxShadow: 'rgba(0, 0, 0, 0.75) 0px 3px 10px',
    transition: { delay: 0.5 },
  },
};
const imgVariants = {
  hover: {
    borderRadius: '6px 6px 0 0',
    transition: { delay: 0.5 },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    borderRadius: '0 0 6px 6px',
    transition: { delay: 0.5 },
  },
};
export default function Movie({
  width,
  bgImg,
  movie,
  offset,
  index,
}: IMovieProps) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(String(movie.id));
  };

  return (
    <Container
      offset={offset}
      variants={containerVariants}
      whileHover='hover'
      transition={{ type: 'tween', duration: 0.2 }}
      width={width}
      index={index}
    >
      <MovieImg
        width={width}
        bgImg={bgImg}
        variants={imgVariants}
        transition={{ type: 'tween', duration: 0.2 }}
        layoutId={movie.id + '_img'}
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
        <Rating>{movie.vote_average.toFixed(1)}/10</Rating>
        <Title>{movie.title}</Title>
      </Info>
    </Container>
  );
}
