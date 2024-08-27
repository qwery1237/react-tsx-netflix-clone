import styled from 'styled-components';
import { IMovieDetail, ITvShowDetail } from '../api';
import { convertTime, getSeasonsOrEpisodes } from '../utils';

interface IDetailProps {
  detail: IMovieDetail | ITvShowDetail;
}
const Wapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 70%;
  height: fit-content;
  padding: ${(props) => props.theme.paddingContainer};
  margin-top: 1.5rem;
`;
const MetaData = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
const Rating = styled.div`
  color: #46d369;
`;
const MetaSecondLine = styled.div`
  display: flex;
  gap: 0.5em;
`;
const ReleasedAt = styled.div`
  color: #bcbcbc;
`;
const Runtime = styled.div`
  color: #bcbcbc;
`;
const Overview = styled.div`
  font-size: 14px;
`;
const Genre = styled.div``;
const GLabel = styled.span`
  color: #767676;
  padding-right: 0.25em;
`;
export default function Detail({ detail }: IDetailProps) {
  return (
    <Wapper>
      <MetaData>
        <Rating>
          {detail.vote_average % 10
            ? detail.vote_average.toFixed(1)
            : detail.vote_average}
          /10
        </Rating>
        <MetaSecondLine>
          <ReleasedAt>
            {(detail as IMovieDetail).release_date?.slice(0, 4) ||
              (detail as ITvShowDetail).first_air_date?.slice(0, 4)}
          </ReleasedAt>
          <Runtime>
            {(detail as IMovieDetail).runtime === 0
              ? ''
              : convertTime((detail as IMovieDetail).runtime) ||
                getSeasonsOrEpisodes(detail as ITvShowDetail)}
          </Runtime>
        </MetaSecondLine>
      </MetaData>
      <Genre>
        <GLabel>Genres:</GLabel>
        {detail.genres.map((gr, i) => (
          <span key={gr.id}>{i === 0 ? gr.name : `, ${gr.name}`}</span>
        ))}
      </Genre>
      <Overview>{detail.overview}</Overview>
    </Wapper>
  );
}
