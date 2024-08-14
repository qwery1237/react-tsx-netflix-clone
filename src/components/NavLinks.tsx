import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';

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
export default function NavLinks() {
  const baseUrl = '/react-tsx-netflix-clone/';
  const homeMatch = useMatch(baseUrl) !== null;
  const tvMatch = useMatch(baseUrl + 'tv') !== null;
  const movieMatch = useMatch(baseUrl + 'movie') !== null;
  return (
    <Wrapper>
      <Item urlMatch={homeMatch}>
        <Link to={baseUrl}>Home</Link>
      </Item>
      <Item urlMatch={tvMatch}>
        <Link to={baseUrl + 'tv'}>TV Shows</Link>
      </Item>
      <Item urlMatch={movieMatch}>
        <Link to={baseUrl + 'movie'}>Movies</Link>
      </Item>
    </Wrapper>
  );
}
