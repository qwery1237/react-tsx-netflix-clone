import { useQuery } from '@tanstack/react-query';
import { getAllMovies, IMovie } from '../api';
import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import styled from 'styled-components';
import Slider from '../components/Slider';
import { useParams, useSearchParams } from 'react-router-dom';
import Preview from '../components/Preview';
const Wrapper = styled.div`
  padding-top: 68px;
`;
const ListWrapper = styled.div`
  margin-bottom: -4vw;
`;
export default function Movie() {
  const { data: movieLists, isLoading } = useQuery({
    queryKey: ['videos', 'movie'],
    queryFn: getAllMovies,
  });
  const { genreId } = useParams();
  const [bannerMovie, setBannerMovie] = useState<IMovie | null>(null);
  const [searchParams] = useSearchParams();
  const showPreview = !!searchParams.get('videoId');
  useEffect(() => {
    if (!movieLists) return;

    setBannerMovie(movieLists[0].results[0]);
  }, [isLoading]);

  if (isLoading || !bannerMovie) return <></>;
  return (
    <Wrapper>
      <Banner banner={bannerMovie} />
      <ListWrapper>
        {movieLists?.map((list, i) => (
          <Slider
            key={list.label}
            videos={
              genreId
                ? list.results.filter((video) =>
                    video.genre_ids.includes(+genreId)
                  )
                : list.results
            }
            label={list.label}
            genre={list.genre}
            isLastSlider={i === movieLists.length - 1}
          />
        ))}
      </ListWrapper>
      {showPreview && <Preview />}
    </Wrapper>
  );
}
