import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getSimilarMovies } from '../api';
import SimilarMovie from './SimilarMovie';

const Wrapper = styled.div`
  padding: ${(props) => props.theme.paddingContainer};
`;
const Label = styled.h3`
  margin: 48px 0 20px;
  font-size: 24px;
`;
const Container = styled.div`
  display: grid;
  column-gap: 20px;
  row-gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
export default function MoreLikeThis() {
  const { contentId } = useParams();

  const { data: similarMovies } = useQuery({
    queryKey: ['similarMovie', contentId],
    queryFn: () => getSimilarMovies(contentId),
  });

  return (
    <Wrapper>
      <Label>More Like This</Label>
      <Container>
        {similarMovies
          ?.filter((movie) => movie.backdrop_path !== null)
          .map((movie) => (
            <SimilarMovie key={movie.id} movie={movie} />
          ))}
      </Container>
    </Wrapper>
  );
}
