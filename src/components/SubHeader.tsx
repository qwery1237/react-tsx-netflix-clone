import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { currentYState } from '../atom';
import { motion, useAnimation } from 'framer-motion';
import { getMovieGenres, getTvGenres } from '../api';
import { useQuery } from '@tanstack/react-query';
import DropDownGenres from './DropDownGenres';
import { FaAngleRight } from 'react-icons/fa6';
interface IProps {
  handleOutletRendered: (isRendered: boolean) => void;
}
const Wrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  top: 68px;
  height: 68px;
  z-index: 3;
  padding: ${(props) => props.theme.paddingContainer};
  @media (max-width: 800px) {
    height: 8.5vw;
  }
`;
const GenreWrapper = styled.div<{ parentGenreExist: boolean }>`
  display: flex;
  align-items: center;
  color: #808080;
  ${(props) => (props.parentGenreExist ? '  gap: 8px;' : '')}
  margin-right: 24px;
  @media (max-width: 800px) {
    font-size: 2vw;
    margin-right: 3vw;
  }
`;
const ParentGenre = styled.div`
  cursor: pointer;
`;
const Genre = styled.div`
  color: ${(props) => props.theme.white.lighter};
  font-size: 38px;
  @media (max-width: 800px) {
    font-size: 4.75vw; // 38.5px
  }
`;
const navVariant = {
  top: {
    backgroundColor: 'rgba(20, 20, 20,0)',
  },
  scroll: { backgroundColor: 'rgba(20,20,20,1)' },
};
export default function SubHeader({ handleOutletRendered }: IProps) {
  const navigate = useNavigate();
  const { genreId } = useParams();
  const { pathname } = useLocation();
  const [showThis, setShowThis] = useState(false);
  const [genre, setGenre] = useState('');
  const [parentGenre, setParentGenre] = useState('');
  const currentY = useRecoilValue(currentYState);
  const isMovies = pathname.includes('movie');
  const isTvShows = pathname.includes('tv');
  const isHome = !isMovies && !isTvShows;
  const { data: movieGenres, isLoading: movieGenreLoading } = useQuery({
    queryKey: ['genres', 'movie'],
    queryFn: getMovieGenres,
    enabled: isMovies,
  });
  const { data: tvGenres, isLoading: tvGenreLoading } = useQuery({
    queryKey: ['genres', 'tv'],
    queryFn: getTvGenres,
    enabled: isTvShows,
  });
  const navAnimation = useAnimation();
  const handleClick = () => {
    handleOutletRendered(false);
    navigate(`/${isMovies ? 'movie' : 'tv'}`);
    window.location.reload();
  };
  useEffect(() => {
    if (!isHome) {
      setShowThis(true);
      if (movieGenreLoading || tvGenreLoading) return;
      if (genreId) {
        const genre = isMovies
          ? movieGenres?.find((genre) => genre.id === +genreId)?.name
          : tvGenres?.find((genre) => genre.id === +genreId)?.name;

        if (!genre) {
          setParentGenre('');
          setGenre(isMovies ? 'Movies' : 'TV Shows');
          return;
        }
        setParentGenre(isMovies ? 'Movies' : 'TV Shows');
        setGenre(genre);
      } else {
        setParentGenre('');
        setGenre(isMovies ? 'Movies' : 'TV Shows');
      }
      return;
    }
    setShowThis(false);
  }, [pathname, movieGenreLoading, tvGenreLoading]);
  useEffect(() => {
    if (currentY > 0) {
      navAnimation.start('scroll');
    } else {
      navAnimation.start('top');
    }
  }, [currentY]);
  return (
    <>
      {showThis ? (
        <Wrapper variants={navVariant} animate={navAnimation}>
          <GenreWrapper parentGenreExist={!!genreId}>
            <ParentGenre onClick={handleClick}>{parentGenre}</ParentGenre>
            {genreId ? <FaAngleRight /> : null}
            <Genre>{genre}</Genre>
          </GenreWrapper>

          <DropDownGenres
            handleOutletRendered={handleOutletRendered}
            genres={isMovies ? movieGenres : tvGenres}
          />
        </Wrapper>
      ) : null}
    </>
  );
}
