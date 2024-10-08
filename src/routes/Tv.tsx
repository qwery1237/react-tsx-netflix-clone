import styled from 'styled-components';
import { getAllTvShows, ITVShow } from '../api';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Banner from '../components/Banner';
import Slider from '../components/Slider';
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import Preview from '../components/Preview';
import { IOutletContext } from '../App';
import NoContent from '../components/NoContent';
import { useSetRecoilState } from 'recoil';
import { titleState } from '../atom';

const Wrapper = styled.div`
  padding-top: 68px;
`;
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
export default function Tv() {
  const { data: tvLists, isLoading } = useQuery({
    queryKey: ['videos', 'tvShow'],
    queryFn: getAllTvShows,
  });
  const { genreId } = useParams();
  const { handleOutletRendered } = useOutletContext<IOutletContext>();
  const [bannerTvShow, setBannerTvShow] = useState<ITVShow | null>(null);
  const [noContent, setNoContent] = useState(false);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('videoId');
  const [showPreview, setShowPreview] = useState(false);
  const setTitle = useSetRecoilState(titleState);

  useEffect(() => {
    if (!tvLists) return;
    if (!genreId) {
      setBannerTvShow(tvLists[0].results[0]);
      return;
    }
    const filtered = tvLists
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
      setBannerTvShow(null);
      setNoContent(true);
      handleOutletRendered(true);
      return;
    }

    const newBanner = filtered[0]?.results[0] || null;
    setBannerTvShow(newBanner);
  }, [genreId, isLoading]);
  useEffect(() => {
    if (!videoId) {
      setShowPreview(false);
      !genreId && setTitle('TV Shows - ');
      return;
    }
    setShowPreview(true);
  }, [videoId]);
  if (noContent) return <NoContent />;
  if (isLoading || !bannerTvShow) return <></>;
  return (
    <Wrapper>
      <Banner banner={bannerTvShow} />
      <ListWrapper>
        {tvLists?.map((list, i) => (
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
            isLastSlider={i === tvLists.length - 1}
          />
        ))}
      </ListWrapper>
      {showPreview && <Preview setShowPreview={setShowPreview} />}
    </Wrapper>
  );
}
