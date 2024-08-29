import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IGenre } from '../api';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { IoCaretDownOutline } from 'react-icons/io5';
import { useScroll } from 'framer-motion';

interface IProps {
  genres?: IGenre[];
  handleOutletRendered: (isRendered: boolean) => void;
}
const Wrapper = styled.div``;
const Trigger = styled.div<{ scrollY: number }>`
  width: 120px;
  height: 30px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${(props) => `solid 1px ${props.theme.white.darker}`};
  color: ${(props) => props.theme.white.lighter};
  ${(props) =>
    props.scrollY === 0
      ? 'background-color:rgba(20,20,20,0.9);'
      : 'background-color:transparent;'}
  cursor: pointer;
  &:hover {
    ${(props) =>
      props.scrollY === 0
        ? 'background-color:transparent;'
        : 'background-color:rgba(43,43,43,1);'}
  }
  @media (max-width: 800px) {
    width: 15vw;
    height: 3.75vw;
    padding: 0 1.5vw;
    font-size: 2vw;
  }
`;
const Text = styled.div`
  cursor: pointer;
`;
const Icon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Genres = styled.div`
  width: 450px;
  display: grid;
  padding: 5px 10px;
  grid-template-columns: repeat(3, 1fr);
  position: fixed;
  top: 120px;
  border: 1px solid hsla(0, 0%, 100%, 0.15);
  background-color: rgba(0, 0, 0, 0.95);
  @media (max-width: 670px) {
    width: 300px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    width: 60vw;
    font-size: 3.2vw;
    padding: 1vw 2vw;
  }
`;
const Genre = styled.div`
  line-height: 24px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 500px) {
    line-height: 4.8vw;
  }
`;
export default function DropDownGenres({
  genres,
  handleOutletRendered,
}: IProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { genreId } = useParams();
  const { scrollY } = useScroll();
  const [showMenu, setShowMenu] = useState(false);

  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = (genreId: number) => {
    handleOutletRendered(false);
    navigate(pathname + '/' + genreId);
    window.location.reload();
  };
  const closeMenu = (event: MouseEvent) => {
    if (!triggerRef.current || !menuRef.current) return;

    if (
      triggerRef.current.contains(event.target as Node) ||
      menuRef.current.contains(event.target as Node)
    )
      return;
    setShowMenu(false);
  };

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);
  useEffect(() => {
    if (showMenu) {
      window.addEventListener('click', closeMenu);
      return () => window.removeEventListener('click', closeMenu);
    }
  }, [showMenu]);

  if (!genres) return <></>;
  return (
    <Wrapper>
      {!genreId ? (
        <Trigger
          ref={triggerRef}
          scrollY={scrollY.get()}
          onClick={() => setShowMenu(true)}
        >
          <Text>Genres</Text>
          <Icon>
            <IoCaretDownOutline />
          </Icon>
        </Trigger>
      ) : null}
      {!genreId && showMenu ? (
        <Genres ref={menuRef}>
          {genres.map((genre) => (
            <Genre onClick={() => handleClick(genre.id)} key={genre.id}>
              {genre.name}
            </Genre>
          ))}
        </Genres>
      ) : null}
    </Wrapper>
  );
}
