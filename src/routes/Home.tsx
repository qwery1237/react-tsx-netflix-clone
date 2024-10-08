import { useSearchParams } from 'react-router-dom';
import Banner from '../components/Banner';
import Slider from '../components/Slider';

import { getVideos, IMovie } from '../api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Preview from '../components/Preview';
import { useSetRecoilState } from 'recoil';
import { titleState } from '../atom';

const ListWrapper = styled.div`
  @media (max-width: 1200px) {
    margin-bottom: 10vw;
  }
  @media (max-width: 800px) {
    margin-bottom: 20vw;
  }
  @media (max-width: 500px) {
    margin-bottom: 30vw;
  }
`;
export default function Home() {
  const { data: videoLists, isLoading } = useQuery({
    queryKey: ['videos', 'all'],
    queryFn: getVideos,
  });
  const [bannerMovie, setBannerMovie] = useState<IMovie | null>(null);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('videoId');
  const [showPreview, setShowPreview] = useState(false);
  const setTitle = useSetRecoilState(titleState);

  useEffect(() => {
    if (!videoLists) return;

    setBannerMovie(videoLists[0].results[0] as IMovie);
  }, [isLoading]);
  useEffect(() => {
    if (!videoId) {
      setShowPreview(false);
      setTitle('Home - ');
      return;
    }
    setShowPreview(true);
  }, [videoId]);
  if (isLoading || !bannerMovie) return <></>;
  return (
    <>
      <Banner banner={bannerMovie} />
      <ListWrapper>
        {videoLists?.map((list, i) => (
          <Slider
            key={list.label}
            videos={list.results}
            label={list.label}
            isLastSlider={i === videoLists.length - 1}
          />
        ))}
      </ListWrapper>
      {showPreview && <Preview setShowPreview={setShowPreview} />}
    </>
  );
}
