import { motion, useAnimation } from 'framer-motion';
import { Link, useLocation, useMatch, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import LogoSVG from './LogoSVG';
import { FiSearch } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentYState } from '../atom';
import useScreenSize from '../hooks/useScreenSize';
import NavLinks from './NavLinks';
import DropDownNav from './DropDownNav';
import { BASE_URL } from '../constants';
import SearchBar from './SearchBar';
interface IProps {
  handleOutletRendered: (isRendered: boolean) => void;
}
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
export default function Header({ handleOutletRendered }: IProps) {
  const { width } = useScreenSize();
  const [searchActive, setSearchActive] = useState(false);
  const currentY = useRecoilValue(currentYState);
  const navAnimation = useAnimation();
  const location = useLocation();
  const homeMatch = useMatch('/') !== null;
  const [searchParams] = useSearchParams();
  const searchKey = searchParams.get('searchKey');

  useEffect(() => {
    if (currentY > 0) {
      navAnimation.start('scroll');
    } else {
      navAnimation.start(homeMatch ? 'top' : 'scroll');
    }
  }, [currentY, location]);

  const openSearchBar = () => setSearchActive(true);
  const closeSearchBar = () => !searchKey && setSearchActive(false);
  const handlePageLeave = (shouldRerender?: boolean) => {
    handleOutletRendered(!shouldRerender);

    searchActive && setSearchActive(false);
  };
  return (
    <Nav variants={navVariant} animate={navAnimation} initial='top'>
      <Logo
        to={BASE_URL + '/'}
        onClick={() => handlePageLeave(homeMatch ? false : true)}
      >
        <LogoSVG />
      </Logo>
      {width > 500 ? (
        <NavLinks handlePageLeave={handlePageLeave} />
      ) : (
        <DropDownNav handlePageLeave={handlePageLeave} />
      )}
      <Search>
        {searchActive ? (
          <SearchBar closeSearchBar={closeSearchBar} />
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
