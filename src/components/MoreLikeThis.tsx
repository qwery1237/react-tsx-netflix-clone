import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getSimilarMovies } from '../api';
import SimilarMovie from './SimilarMovie';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Wrapper = styled.div`
  padding: ${(props) => props.theme.paddingContainer};
`;
const Label = styled.h3`
  margin: 48px 0 20px;
  font-size: 24px;
`;
const Container = styled.div<{ showMore: boolean }>`
  overflow: hidden;
  ${(props) => !props.showMore && 'max-height: 60em;'}
`;
const Similars = styled.div`
  display: grid;
  column-gap: 20px;
  row-gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const Divider = styled.div<{ showMore: boolean }>`
  ${(props) =>
    !props.showMore
      ? 'position:relative; top:-96px;   background-image: linear-gradient( to bottom,rgba(20, 20, 20, 0),rgba(20, 20, 20, 0) 40%,rgba(20, 20, 20, 1) 100%);'
      : 'margin-bottom:96px;'}
  width: 100%;
  height: 96px;
  border-bottom: 2px solid #404040;
  display: flex;
  justify-content: center;
`;
const Controller = styled.div`
  position: relative;
  bottom: -76px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border: solid 2px rgba(255, 255, 255, 0.5);
  background-color: rgba(42, 42, 42, 0.6);
  cursor: pointer;
  &:hover {
    border-color: ${(props) => props.theme.white.darker};
  }
`;
const NoContent = styled.div`
  margin-bottom: 40px;
`;
export default function MoreLikeThis() {
  const { contentId } = useParams();
  const [showMore, setShowMore] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: similarMovies } = useQuery({
    queryKey: ['similarMovie', contentId],
    queryFn: () => getSimilarMovies(contentId),
  });
  const toggleShowMore = () => setShowMore((prev) => !prev);
  useEffect(() => {
    if (showMore || !containerRef.current) return;
    containerRef.current.scrollIntoView({ block: 'start' });
  }, [showMore]);

  return (
    <Wrapper>
      <Label>More Like This</Label>
      {similarMovies?.length ? (
        <Container ref={containerRef} showMore={showMore}>
          <Similars>
            {similarMovies
              .filter((movie) => movie.backdrop_path !== null)
              .map((movie) => (
                <SimilarMovie key={movie.id} movie={movie} />
              ))}
          </Similars>
        </Container>
      ) : (
        <NoContent>No available content.</NoContent>
      )}
      {similarMovies?.length ? (
        <Divider showMore={showMore}>
          <Controller onClick={toggleShowMore}>
            {showMore ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Controller>
        </Divider>
      ) : null}
    </Wrapper>
  );
}
