import { motion, useAnimation } from 'framer-motion';
import { Link, useLocation, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import LogoSVG from './LogoSVG';
import { FiSearch } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentYState } from '../atom';
import useScreenSize from '../hooks/useScreenSize';
import NavLinks from './NavLinks';
import DropDownNav from './DropDownNav';

const Nav = styled(motion.nav)`
  width: 100%;
  display: flex;
  align-items: center;
  height: 68px;
  position: fixed;
  top: 0;
  z-index: 4;
  padding: ${(props) => props.theme.paddingContainer};
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 10%,
    transparent
  );
  overflow-y: visible;
`;
const Logo = styled(Link)``;

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
  scroll: { backgroundColor: 'rgba(20,20,20,1)' },
};
export default function Header() {
  const { width } = useScreenSize();
  const [searchActive, setSearchActive] = useState(false);
  const currentY = useRecoilValue(currentYState);
  const navAnimation = useAnimation();
  const location = useLocation();
  const homeMatch = useMatch('/react-tsx-netflix-clone/') !== null;
  useEffect(() => {
    if (currentY > 0) {
      navAnimation.start('scroll');
    } else {
      navAnimation.start(homeMatch ? 'top' : 'scroll');
    }
  }, [currentY, location]);

  const baseUrl = '/react-tsx-netflix-clone/';

  const openSearchBar = () => setSearchActive(true);
  const closeSearchBar = () => setSearchActive(false);

  return (
    <Nav variants={navVariant} animate={navAnimation} initial='top'>
      <Logo to={baseUrl}>
        <LogoSVG />
      </Logo>
      {width > 500 ? <NavLinks /> : <DropDownNav />}
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
