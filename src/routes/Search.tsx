import { useOutletContext, useSearchParams } from 'react-router-dom';
import { IOutletContext } from '../App';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchResults, ISearchResults, VideoType } from '../api';
import styled from 'styled-components';
import { getOffset } from '../utils';
import useScreenSize from '../hooks/useScreenSize';
import NoContent from '../components/NoContent';
import Video from '../components/Video';
import { motion } from 'framer-motion';
import Preview from '../components/Preview';
import { useEffect, useState } from 'react';
import SubLoader from '../components/SubLoader';

const Wrapper = styled(motion.div)<{ offset: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.offset},1fr)`};
  margin-top: 198px;
  padding: ${(props) => props.theme.paddingContainer};
  gap: 4px;
  row-gap: 6vw;
  position: relative;
  z-index: 2;
  @media (min-width: 1201px) {
    margin-bottom: 15vw;
  }
  @media (max-width: 1200px) {
    margin-bottom: 20vw;
  }
  @media (max-width: 800px) {
    margin-bottom: 30vw;
  }
  @media (max-width: 500px) {
    margin-bottom: 40vw;
  }
`;
const VideoWrapper = styled.div`
  width: 100px;
  height: 100px;
`;

export default function Search() {
  const [videos, setVideos] = useState<VideoType>([]);
  const { handleOutletRendered, setHideFooter } =
    useOutletContext<IOutletContext>();
  const { width } = useScreenSize();
  const offset = getOffset(width);
  const boxWidth = (width * 0.92 - 4 * (offset + 1)) / offset;
  const [searchParams] = useSearchParams();
  const searchKey = searchParams.get('searchKey');
  const showPreview = !!searchParams.get('videoId');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<ISearchResults>({
      queryKey: ['search', searchKey],
      queryFn: ({ pageParam = 1 }) =>
        getSearchResults({
          pageParam: typeof pageParam === 'number' ? pageParam : 1,
          keyword: searchKey || '',
        }),
      getNextPageParam: (lastPage) =>
        lastPage.nextPage > lastPage.totalPages ? undefined : lastPage.nextPage,
      enabled: !!searchKey,
      initialPageParam: 1,
    });
  const handleWheel = async (event: WheelEvent) => {
    const isMouseDown = event.deltaY >= 0;
    const isScrollBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight;

    if (!isScrollBottom || !isMouseDown || !hasNextPage || isFetchingNextPage)
      return;

    await fetchNextPage();
  };

  useEffect(() => {
    setHideFooter(hasNextPage);
    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [hasNextPage, isFetchingNextPage]);
  useEffect(() => {
    if (!data) return;

    handleOutletRendered(true);
    if (data.pages.length === 1) {
      setVideos(data.pages[0].videos);

      return;
    }
    if (videos.length && videos[0].id !== data.pages[0].videos[0].id) {
      setVideos([]);
      data.pages.map(({ videos: list }) => {
        setVideos((prev) => [...prev, ...list]);
      });
      return;
    }
    setVideos((prev) => [...prev, ...data.pages[data.pages.length - 1].videos]);
  }, [data]);

  if (isLoading) return <></>;
  return (
    <>
      {!videos || !videos.length ? (
        <NoContent />
      ) : (
        <Wrapper offset={offset}>
          {videos.map((video, i) => (
            <VideoWrapper>
              <Video
                key={video.id}
                boxWidth={boxWidth}
                video={video}
                pointerEventExist
                contentExist
                index={i}
                offset={offset}
              />
            </VideoWrapper>
          ))}
          {isFetchingNextPage && <SubLoader />}
        </Wrapper>
      )}
      {showPreview && <Preview />}
    </>
  );
}
