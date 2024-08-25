import { useEffect, useState } from 'react';
import { IoCaretDownOutline, IoCaretUpOutline } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { BASE_URL } from '../constants';
interface IProps {
  handlePageLeave: (shouldRerender: boolean) => void;
}
interface IShowMenuProps {
  mouseOnTrigger: boolean;
  mouseOnMenu: boolean;
  mouseReturnedToMenu: boolean;
}
const MenuTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: 20px;
  font-size: 12px;
  cursor: pointer;
  :last-child {
    position: relative;
    top: 1px;
  }
`;
const MenuNav = styled.div`
  flex: 0;
  min-width: 250px;
  position: relative;
  top: 130px;
  left: -156px;
  z-index: 3;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid hsla(0, 0%, 100%, 0.15);
  border-top: solid 2px white;
`;
const NavArrow = styled.span`
  font-size: 24px;
  color: white;
  position: relative;
  top: -17px;
  margin-bottom: -31px;
`;
const NavItem = styled(Link)<{ urlMatch?: boolean }>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  transition: background-color 0.3s ease-in-out;
  ${(props) =>
    props.urlMatch
      ? 'pointer-events:none; cursor:default'
      : ' color: #b3b3b3; cursor: pointer;'};
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
export default function DropDownNav({ handlePageLeave }: IProps) {
  const [showMenu, setShowMenu] = useState<IShowMenuProps>({
    mouseOnTrigger: false,
    mouseOnMenu: false,
    mouseReturnedToMenu: false,
  });

  const { pathname } = useLocation();
  const tvMatch = pathname.includes('tv');
  const movieMatch = pathname.includes('movie');
  const homeMatch = !tvMatch && !movieMatch;

  const handleOpenMenu = (component: 'menu' | 'trigger') => {
    if (component === 'menu') {
      if (showMenu.mouseOnMenu) {
        setShowMenu((prev) => ({ ...prev, mouseReturnedToMenu: true }));
        return;
      }
      setShowMenu((prev) => ({ ...prev, mouseOnMenu: true }));
      return;
    }

    setShowMenu((prev) => ({ ...prev, mouseOnTrigger: true }));
  };
  const handleCloseMenu = (component: 'menu' | 'trigger') => {
    if (component === 'menu') {
      setShowMenu((prev) => ({ ...prev, mouseReturnedToMenu: false }));
      setTimeout(() => {
        setShowMenu((prev) => ({
          ...prev,
          mouseOnMenu: prev.mouseReturnedToMenu,
        }));
      }, 300);
      return;
    }
    setTimeout(
      () => setShowMenu((prev) => ({ ...prev, mouseOnTrigger: false })),
      300
    );
  };

  useEffect(() => {
    setShowMenu({
      mouseOnMenu: false,
      mouseOnTrigger: false,
      mouseReturnedToMenu: false,
    });
  }, [pathname]);
  return (
    <>
      <MenuTrigger
        onMouseEnter={() => handleOpenMenu('trigger')}
        onMouseLeave={() => handleCloseMenu('trigger')}
      >
        Browse
        <IoCaretDownOutline />
      </MenuTrigger>
      {showMenu.mouseOnMenu || showMenu.mouseOnTrigger ? (
        <MenuNav
          onMouseEnter={() => handleOpenMenu('menu')}
          onMouseLeave={() => handleCloseMenu('menu')}
        >
          <NavArrow>
            <IoCaretUpOutline />
          </NavArrow>
          <NavItem
            onClick={() => handlePageLeave(true)}
            to={BASE_URL}
            urlMatch={homeMatch}
          >
            Home
          </NavItem>
          <NavItem
            onClick={() => handlePageLeave(true)}
            to={BASE_URL + 'tv'}
            urlMatch={tvMatch}
          >
            TV Shows
          </NavItem>
          <NavItem
            onClick={() => handlePageLeave(true)}
            to={BASE_URL + 'movie'}
            urlMatch={movieMatch}
          >
            Movies
          </NavItem>
        </MenuNav>
      ) : null}
    </>
  );
}
