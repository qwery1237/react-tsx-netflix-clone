import styled from 'styled-components';
import { IMovie } from '../api';
import { makeImgPath } from '../utils';
import { SiNetflix } from 'react-icons/si';

interface ISimilarProps {
  movie: IMovie;
}
const Card = styled.div`
  background-color: #2f2f2f;
  border-radius: 6px;
  overflow: hidden;
`;
const MovieImg = styled.div<{ bgImg: string }>`
  background-image: ${(props) => `url(${props.bgImg})`};
  aspect-ratio: 11/6;
  background-position: center;
  background-size: cover;
  position: relative;
  padding-left: 50%;
  padding-right: 4px;
`;
const Logo = styled.div`
  color: ${(props) => props.theme.red};
  position: absolute;
  top: 8px;
  left: 4px;
`;
const Title = styled.div`
  height: 100%;
  font-weight: 700;
  text-align: center;
  display: flex;
  justify-content: right;
  align-items: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;
export default function SimilarMovie({ movie }: ISimilarProps) {
  return (
    <Card>
      <MovieImg bgImg={makeImgPath(movie.backdrop_path)}>
        <Logo>
          <SiNetflix />
        </Logo>
        <Title>{movie.title}</Title>
      </MovieImg>
    </Card>
  );
}
