import styled from 'styled-components';
import { IMovie, ITVShow } from '../api';
import { makeImgPath } from '../utils';
import { SiNetflix } from 'react-icons/si';
import { useLocation, useNavigate } from 'react-router-dom';

interface ISimilarProps {
  video: IMovie | ITVShow;
}
const Card = styled.div`
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
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
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;
const Title = styled.div`
  height: 100%;
  font-weight: 700;
  text-align: center;
  display: flex;
  justify-content: right;
  align-items: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;
const Detail = styled.div`
  width: 100%;
  padding: 20px 12px;
`;
const MetaData = styled.div``;
const Rating = styled.span`
  color: #46d369;
`;
const Year = styled.span`
  margin-left: 6px;
  color: #bcbcbc;
`;
const Overview = styled.div`
  font-size: 14px;
  margin-top: 20px;

  color: #d2d2d2;
  height: 120px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

export default function SimilarVideo({ video }: ISimilarProps) {
  const { genre } = useLocation().state;
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`../${video.id}`, { state: { genre } });
  };
  return (
    <Card onClick={onClick}>
      <MovieImg bgImg={makeImgPath(video.backdrop_path)}>
        <Logo>
          <SiNetflix />
        </Logo>
        <Title>{(video as IMovie).title || (video as ITVShow).name}</Title>
      </MovieImg>
      <Detail>
        <MetaData>
          <Rating>{video.vote_average.toFixed(1)}/10</Rating>
          <Year>
            {(video as IMovie).release_date?.slice(0, 4) ||
              (video as ITVShow).first_air_date?.slice(0, 4)}
          </Year>
        </MetaData>
        <Overview>{video.overview}</Overview>
      </Detail>
    </Card>
  );
}
