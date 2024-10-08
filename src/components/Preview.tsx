import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { currentYState, titleState } from '../atom';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetail, IMovieDetail, ITvShowDetail } from '../api';
import { makeImgPath } from '../utils';
import { IoCloseOutline } from 'react-icons/io5';
import { SiNetflix } from 'react-icons/si';
import Detail from './Detail';
import MoreLikeThis from './MoreLikeThis';
import AboutThis from './AboutThis';
interface IPreviewProps {
  setShowPreview: (showPreview: boolean) => void;
}
const Wrapper = styled(motion.div)<{ top: number }>`
  position: absolute;
  top: ${(props) => props.top + 'px'};
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 32px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  @media (max-width: 500px) {
    padding: 0;
  }
`;
const PreviewModal = styled(motion.div)`
  width: 850px;
  height: fit-content;
  max-width: 96%;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
  background-color: ${(props) => props.theme.black.veryDark};
  border-radius: 12px 12px 0 0;
  @media (max-width: 500px) {
    max-width: 100%;
    border-radius: 0;
  }
`;
const MovieImg = styled(motion.div)<{ bgImg: string }>`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.paddingContainer};
  position: relative;
  width: 100%;
  background-image: linear-gradient(
      to bottom,
      rgba(20, 20, 20, 0),
      rgba(20, 20, 20, 0) 70%,
      rgba(20, 20, 20, 1) 100%
    ),
    url(${(props) => props.bgImg});
  aspect-ratio: 11/6;
  background-size: cover;
  background-position: center;
  border-radius: 12px 12px 0 0;
  @media (max-width: 500px) {
    border-radius: 0;
  }
`;
const CloseIcon = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.black.veryDark};
  font-size: 28px;
  cursor: pointer;
`;
const TitleWrapper = styled.div``;
const TitleLogo = styled.div`
  font-size: 18px;
  letter-spacing: 0.5vw;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: #c2c3c2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  svg {
    width: 1.5em;
    height: 1.5em;
    fill: ${(props) => props.theme.red};
  }
  @media (max-width: 860px) {
    font-size: 2vw;
  }
`;
const Title = styled.h1`
  font-size: 36px;
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  @media (max-width: 860px) {
    font-size: 4vw;
  }
`;
export default function Preview({ setShowPreview }: IPreviewProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentY = useRecoilValue(currentYState);
  const [showModal, setShowModal] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const videoId = searchParams.get('videoId') || '';
  const searchKey = searchParams.get('searchKey');
  const containerRef = useRef<HTMLDivElement>(null);
  const setTitle = useSetRecoilState(titleState);
  const { genre } = useLocation().state;

  const { data: detail } = useQuery({
    queryKey: ['videoDetail', videoId],
    queryFn: () => getMovieDetail(videoId, genre),
  });

  const hideContent = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target) return;

    setShowModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
      document.documentElement.style.overflow = 'visible';
    };
  }, []);
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = 0;
  }, [videoId]);
  useEffect(() => {
    if (!detail) return;
    setTitle(
      ((detail as IMovieDetail).title || (detail as ITvShowDetail).name) + ' - '
    );
    return () => {
      setTitle('');
    };
  }, [detail]);
  return (
    <AnimatePresence
      onExitComplete={() => {
        setSearchParams({});
        navigate(
          pathname === '/'
            ? pathname + '/'
            : searchKey
            ? pathname + `?searchKey=${searchKey}`
            : pathname
        );
        setShowPreview(false);
      }}
    >
      {showModal && detail && (
        <Wrapper
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'tween', duration: 0.2 }}
          top={currentY}
          onClick={hideContent}
        >
          <PreviewModal
            initial={{ scale: 0, transformOrigin: 'center top' }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            <MovieImg
              bgImg={makeImgPath(detail.backdrop_path || detail.poster_path)}
            >
              <CloseIcon onClick={() => setShowModal(false)}>
                <IoCloseOutline />
              </CloseIcon>
              <TitleWrapper>
                <TitleLogo>
                  <SiNetflix />
                  SERIES
                </TitleLogo>
                <Title>
                  {genre === 'movie'
                    ? (detail as IMovieDetail).title.toUpperCase()
                    : (detail as ITvShowDetail).name.toUpperCase()}
                </Title>
              </TitleWrapper>
            </MovieImg>
            <Detail detail={detail} />
            <MoreLikeThis />
            <AboutThis detail={detail} />
          </PreviewModal>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}
