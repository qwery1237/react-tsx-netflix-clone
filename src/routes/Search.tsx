import { useOutletContext, useSearchParams } from 'react-router-dom';
import { IOutletContext } from '../App';
import { useQuery } from '@tanstack/react-query';
import { getVideosByKeyword } from '../api';
import styled from 'styled-components';
import { getOffset } from '../utils';
import useScreenSize from '../hooks/useScreenSize';
import NoContent from '../components/NoContent';
import Video from '../components/Video';
import { motion } from 'framer-motion';
import Preview from '../components/Preview';

const Wrapper = styled(motion.div)<{ offset: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.offset},1fr)`};
  margin-top: 198px;
  margin-bottom: 3vw;
  padding: ${(props) => props.theme.paddingContainer};
  gap: 4px;
  row-gap: 6vw;
  position: relative;
  min-height: 50vh;
`;
const VideoWrapper = styled.div`
  width: 100px;
  height: 100px;
`;
export default function Search() {
  const { handleOutletRendered } = useOutletContext<IOutletContext>();
  const { width } = useScreenSize();
  const offset = getOffset(width);
  const boxWidth = (width * 0.92 - 4 * (offset + 1)) / offset;
  const [searchParams] = useSearchParams();
  const searchKey = searchParams.get('searchKey');
  const showPreview = !!searchParams.get('videoId');
  const { data: videos, isLoading } = useQuery({
    queryKey: ['search', searchKey],
    queryFn: () => getVideosByKeyword(searchKey || ''),
    enabled: !!searchKey,
  });
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
        </Wrapper>
      )}
      {showPreview && <Preview />}
    </>
  );
}
