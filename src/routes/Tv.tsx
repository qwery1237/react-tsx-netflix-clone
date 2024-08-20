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

const Wrapper = styled.div`
  padding-top: 68px;
`;
const ListWrapper = styled.div`
  margin-bottom: -4vw;
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
  const showPreview = !!searchParams.get('videoId');

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
      {showPreview && <Preview />}
    </Wrapper>
  );
}