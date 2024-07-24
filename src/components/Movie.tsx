import { motion } from 'framer-motion';
import styled from 'styled-components';
import { IMovie } from '../api';
import { useQuery } from '@tanstack/react-query';
export interface IMovieProps {
  bgImg: string;
  width: number;
  movie?: IMovie;
}
const Container = styled(motion.div)<{ width: number }>`
  border-radius: 0.2rem;
  overflow: hidden;
  width: ${(props) => props.width + 'px'};
`;
const MovieImg = styled.div<IMovieProps>`
  width: 100%;
  height: ${(props) => (props.width / 11) * 6 + 'px'};
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.bgImg});
`;
export default function Movie({ width, bgImg, movie }: IMovieProps) {
  return (
    <Container width={width}>
      <MovieImg width={width} bgImg={bgImg} />
    </Container>
  );
}
