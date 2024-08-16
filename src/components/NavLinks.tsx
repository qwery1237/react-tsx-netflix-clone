import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { BASE_URL } from '../constants';
interface IProps {
  handleOutletRendered: (isRendered: boolean) => void;
}
const Wrapper = styled.ul`
  margin-left: 40px;
  flex: 1;
  display: flex;
  gap: 24px;
`;
const Item = styled.li<{ urlMatch?: boolean }>`
  display: flex;
  align-items: center;
  font-size: small;
  ${(props) =>
    props.urlMatch
      ? 'font-weight:700; pointer-events:none; cursor:default'
      : 'color:#E5E5E5'};

  transition: color ease-in-out 0.3s;
  &:hover {
    color: #b3b3b3;
  }
`;
export default function NavLinks({ handleOutletRendered }: IProps) {
  const homeMatch = useMatch(BASE_URL) !== null;
  const tvMatch = useMatch(BASE_URL + 'tv') !== null;
  const movieMatch = useMatch(BASE_URL + 'movie') !== null;
  const handleRendered = () => handleOutletRendered(false);
  return (
    <Wrapper>
      <Item urlMatch={homeMatch}>
        <Link onClick={handleRendered} to={BASE_URL}>
          Home
        </Link>
      </Item>
      <Item urlMatch={tvMatch}>
        <Link onClick={handleRendered} to={BASE_URL + 'tv'}>
          TV Shows
        </Link>
      </Item>
      <Item urlMatch={movieMatch}>
        <Link onClick={handleRendered} to={BASE_URL + 'movie'}>
          Movies
        </Link>
      </Item>
    </Wrapper>
  );
}
