import { motion, useAnimation } from 'framer-motion';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import LogoSVG from './LogoSVG';
import { FiSearch } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentYState } from '../atom';

const Nav = styled(motion.nav)`
  width: 100%;
  display: flex;
  align-items: center;
  height: 68px;
  position: fixed;
  top: 0;
  z-index: 2;
  padding: ${(props) => props.theme.paddingContainer};
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 10%,
    transparent
  );
`;
const Logo = styled(Link)`
  margin-right: 40px;
`;

const Menu = styled.ul`
  flex: 1;
  display: flex;
  gap: 24px;
`;
const Item = styled.li<{ urlMatch?: boolean }>`
  display: flex;
  align-items: center;
  font-size: small;
  ${(props) =>
    props.urlMatch && 'font-weight:700; pointer-events:none; cursor:default'};
  transition: opacity ease-in-out 0.4s;
  &:hover {
    opacity: 0.6;
  }
`;
const Search = styled.form`
  position: absolute;
  right: 4%;
  svg {
    width: 24px;
    height: 24px;
    stroke-width: 2;
  }
`;
const SearchBar = styled(motion.div)`
  background-color: rgba(20, 20, 20, 1);
  border: solid 1px white;
  display: flex;
  width: 250px;
  max-width: 92vw;
  height: 30px;
  align-items: center;
  padding: 0 4px;
  gap: 12px;
  transform-origin: right center;
`;
const Input = styled.input``;
const Btn = styled(motion.button)`
  display: flex;
  align-items: center;
`;
const navVariant = {
  top: {
    backgroundColor: 'rgba(20, 20, 20,0)',
  },
  scroll: { backgroundColor: 'rgba(20, 20, 20,1)' },
};
export default function Header() {
  const [searchActive, setSearchActive] = useState(false);
  const currentY = useRecoilValue(currentYState);
  const navAnimation = useAnimation();
  useEffect(() => {
    if (currentY > 0) {
      navAnimation.start('scroll');
    } else {
      navAnimation.start('top');
    }
  }, [currentY]);

  const baseUrl = '/react-tsx-netflix-clone/';
  const homeMatch = useMatch(baseUrl) !== null;
  const tvMatch = useMatch(baseUrl + 'tv') !== null;
  const movieMatch = useMatch(baseUrl + 'movie') !== null;

  const openSearchBar = () => setSearchActive(true);
  const closeSearchBar = () => setSearchActive(false);
  return (
    <Nav variants={navVariant} animate={navAnimation} initial='top'>
      <Logo to={'/react-tsx-netflix-clone/'}>
        <LogoSVG />
      </Logo>
      <Menu>
        <Item urlMatch={homeMatch}>
          <Link to={baseUrl}>Home</Link>
        </Item>
        <Item urlMatch={tvMatch}>
          <Link to={baseUrl + 'tv'}>TV Shows</Link>
        </Item>
        <Item urlMatch={movieMatch}>
          <Link to={baseUrl + 'movie'}>Movies</Link>
        </Item>
      </Menu>
      <Search>
        {searchActive ? (
          <SearchBar initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}>
            <Btn layoutId='search'>
              <FiSearch />
            </Btn>
            <Input
              autoFocus
              onBlur={closeSearchBar}
              placeholder='Titles,people,genres'
            />
          </SearchBar>
        ) : (
          <Btn
            style={{ cursor: 'pointer' }}
            layoutId='search'
            onClick={openSearchBar}
          >
            <FiSearch />
          </Btn>
        )}
      </Search>
    </Nav>
  );
}
