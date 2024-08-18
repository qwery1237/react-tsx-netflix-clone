import { useSearchParams } from 'react-router-dom';
import Banner from '../components/Banner';
import Slider from '../components/Slider';

import { getVideos, IMovie } from '../api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Preview from '../components/Preview';

const ListWrapper = styled.div`
  margin-bottom: -4vw;
`;
export default function Home() {
  const { data: videoLists, isLoading } = useQuery({
    queryKey: ['videos', 'all'],
    queryFn: getVideos,
  });
  const [bannerMovie, setBannerMovie] = useState<IMovie | null>(null);
  const [searchParams] = useSearchParams();
  const showPreview = !!searchParams.get('videoId');
  useEffect(() => {
    if (!videoLists) return;

    setBannerMovie(videoLists[0].results[0] as IMovie);
  }, [isLoading]);

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
      {showPreview && <Preview />}
    </>
  );
}
