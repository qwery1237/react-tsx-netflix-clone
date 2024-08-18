import { useQuery } from '@tanstack/react-query';
import { getAllMovies, IMovie } from '../api';
import { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import styled from 'styled-components';
import Slider from '../components/Slider';
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import Preview from '../components/Preview';
import { IOutletContext } from '../App';
import NoContent from '../components/NoContent';
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
  const { handleOutletRendered } = useOutletContext<IOutletContext>();
  const [bannerMovie, setBannerMovie] = useState<IMovie | null>(null);
  const [noContent, setNoContent] = useState(false);
  const [searchParams] = useSearchParams();
  const showPreview = !!searchParams.get('videoId');

  useEffect(() => {
    if (!movieLists) return;
    if (!genreId) {
      setBannerMovie(movieLists[0].results[0]);
      return;
    }
    const filtered = movieLists
      .map((list) => {
        const filterdList = {
          ...list,
          results: list.results.filter((video) =>
            video.genre_ids.includes(+genreId)
          ),
        };
        if (filterdList.results.length === 0) return;
        return filterdList;
      })
      .filter((list) => list);
    if (filtered.length === 0) {
      setBannerMovie(null);
      setNoContent(true);
      handleOutletRendered(true);
      return;
    }

    const newBanner = filtered[0]?.results[0] || null;
    setBannerMovie(newBanner);
  }, [genreId, isLoading]);
  if (noContent) return <NoContent />;
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
            isLastSlider={i === movieLists.length - 1}
          />
        ))}
      </ListWrapper>
      {showPreview && <Preview />}
    </Wrapper>
  );
}
