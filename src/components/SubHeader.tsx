import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { currentYState } from '../atom';
import { motion, useAnimation } from 'framer-motion';
import { getMovieGenres, getTvGenres } from '../api';
import { useQuery } from '@tanstack/react-query';
import DropDownGenres from './DropDownGenres';
import { FaAngleRight } from 'react-icons/fa6';

const Wrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  top: 68px;
  height: 68px;
  z-index: 3;
  padding: ${(props) => props.theme.paddingContainer};
`;
const GenreWrapper = styled.div<{ parentGenreExist: boolean }>`
  display: flex;
  align-items: center;
  color: #808080;
  ${(props) => (props.parentGenreExist ? '  gap: 8px;' : '')}
  margin-right: 24px;
  @media (max-width: 500px) {
    font-size: 3.85vw;
    margin-right: 4.8vw;
  }
`;
const ParentGenre = styled(Link)`
  cursor: pointer;
`;
const Genre = styled.div`
  color: ${(props) => props.theme.white.lighter};
  font-size: 38px;
  @media (max-width: 500px) {
    font-size: 7.7vw;
  }
`;
const navVariant = {
  top: {
    backgroundColor: 'rgba(20, 20, 20,0)',
  },
  scroll: { backgroundColor: 'rgba(20,20,20,1)' },
};
export default function SubHeader() {
  const { genreId } = useParams();
  const { pathname } = useLocation();
  const [showThis, setShowThis] = useState(false);
  const [genre, setGenre] = useState('');
  const [parentGenre, setParentGenre] = useState('');
  const currentY = useRecoilValue(currentYState);
  const location = useLocation();
  const isMovies = pathname.includes('movie');
  const isTvShows = pathname.includes('tv');
  const isHome = !isMovies && !isTvShows;
  const { data: movieGenres } = useQuery({
    queryKey: ['genres', 'movie'],
    queryFn: getMovieGenres,
    enabled: isMovies && !genreId,
  });
  const { data: tvGenres } = useQuery({
    queryKey: ['genres', 'tv'],
    queryFn: getTvGenres,
    enabled: isTvShows && !genreId,
  });

  const navAnimation = useAnimation();
  getMovieGenres();
  getTvGenres();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(1);

    if (!isHome) {
      setShowThis(true);
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
  }, [location]);
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
            <ParentGenre
              to={`/react-tsx-netflix-clone/${isMovies ? 'movie' : 'tv'}`}
            >
              {parentGenre}
            </ParentGenre>
            {genreId ? <FaAngleRight /> : null}
            <Genre>{genre}</Genre>
          </GenreWrapper>

          <DropDownGenres genres={isMovies ? movieGenres : tvGenres} />
        </Wrapper>
      ) : null}
    </>
  );
}
