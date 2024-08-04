import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { currentYState } from '../atom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetail } from '../api';
import { makeImgPath } from '../utils';
import { IoCloseOutline } from 'react-icons/io5';
import { SiNetflix } from 'react-icons/si';
const Wrapper = styled(motion.div)<{ top: number }>`
  position: absolute;
  top: ${(props) => props.top + 'px'};
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 32px;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  @media (max-width: 500px) {
    padding: 0;
  }
`;
const MovieDetail = styled(motion.div)`
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
  @media (max-width: 860px) {
    font-size: 4vw;
  }
`;
const Detail = styled.div`
  width: 100%;
  height: fit-content;
  padding: ${(props) => props.theme.paddingContainer};
`;
const Rating = styled.div`
  color: #46d369;
  margin: 0.3vw 0;
`;
const ReleasedAt = styled.div`
  color: #bcbcbc;
`;
const Runtime = styled.div``;
const Overview = styled.div``;
const Genre = styled.div``;
export default function Preview() {
  const navigate = useNavigate();
  const currentY = useRecoilValue(currentYState);
  const { contentId } = useParams();
  const { data: detail } = useQuery({
    queryKey: ['movieDetail', contentId],
    queryFn: () => getMovieDetail(contentId),
  });
  const [showModal, setShowModal] = useState(true);
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
  if (!detail) {
    navigate(-1);
    return <></>;
  }
  console.log(detail);

  return (
    <AnimatePresence onExitComplete={() => navigate('../')}>
      {showModal && (
        <Wrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'tween', duration: 0.2 }}
          top={currentY}
          onClick={hideContent}
        >
          <MovieDetail
            initial={{ scale: 0, transformOrigin: 'center top' }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            <MovieImg bgImg={makeImgPath(detail.backdrop_path)}>
              <CloseIcon
                onClick={() => {
                  setShowModal(false);
                }}
              >
                <IoCloseOutline />
              </CloseIcon>
              <TitleWrapper>
                <TitleLogo>
                  <SiNetflix />
                  SERIES
                </TitleLogo>
                <Title>{detail.title.toUpperCase()}</Title>
              </TitleWrapper>
            </MovieImg>
            <Detail>
              <Rating>{detail.vote_average.toFixed(1)}/10</Rating>
              <ReleasedAt>{detail.release_date.slice(0, 4)}</ReleasedAt>
              <Runtime>{detail.runtime} m</Runtime>
              <Overview>{detail.overview}</Overview>
              <Genre>
                <span>Genres</span>
              </Genre>
            </Detail>
          </MovieDetail>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}
