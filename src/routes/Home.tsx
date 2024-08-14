import { useMatch } from 'react-router-dom';
import Banner from '../components/Banner';
import Slider from '../components/Slider';
import Preview from '../components/Preview';
import { getAllVideos, IMovie } from '../api';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { bannerMovieState } from '../atom';
import { useEffect } from 'react';
import styled from 'styled-components';

const ListWrapper = styled.div`
  margin-bottom: -4vw;
`;
export default function Home() {
  const showPreview = useMatch('/react-tsx-netflix-clone/:contentId') !== null;
  const { data: videoLists, isLoading } = useQuery({
    queryKey: ['videos', 'all'],
    queryFn: getAllVideos,
  });
  const [bannerMovie, setBannerMovie] = useRecoilState(bannerMovieState);
  useEffect(() => {
    if (!videoLists) return;

    setBannerMovie(videoLists[0].results[0] as IMovie);
  }, [isLoading]);
  if (isLoading || !bannerMovie.id) return <></>;
  return (
    <>
      <Banner />
      <ListWrapper>
        {videoLists?.map((list, i) => (
          <Slider
            key={list.label}
            videos={list.results}
            label={list.label}
            genre={list.genre}
            isLastSlider={i === videoLists.length - 1}
          />
        ))}
      </ListWrapper>
      {showPreview && <Preview />}
    </>
  );
}
