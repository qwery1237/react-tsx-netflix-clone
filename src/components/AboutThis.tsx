import styled from 'styled-components';
import { IMovieDetail, ITvShowDetail } from '../api';
import { useLocation } from 'react-router-dom';

interface IAboutProps {
  detail: IMovieDetail | ITvShowDetail;
}
const Wrapper = styled.div`
  padding: ${(props) => props.theme.paddingContainer};
  margin-bottom: 32px;
`;
const Header = styled.h3`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
`;
const Title = styled.strong`
  font-weight: 500;
`;
const About = styled.div`
  font-size: 14px;
`;
const Tag = styled.div`
  margin-bottom: 14px;
  display: flex;
`;
const Label = styled.div`
  color: #777777;
`;
const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Item = styled.span`
  margin-left: 4px;
`;
export default function AboutThis({ detail }: IAboutProps) {
  const { genre } = useLocation().state;
  return (
    <Wrapper>
      <Header>
        About{' '}
        <Title>
          {(detail as IMovieDetail).title || (detail as ITvShowDetail).name}
        </Title>
      </Header>
      <About>
        {genre === 'tv' ? (
          <Tag>
            <Label>Creators:</Label>
            <Items>
              {(detail as ITvShowDetail).created_by.map(
                (creator, i, creators) => (
                  <Item key={creator.id}>
                    {i === creators.length - 1
                      ? creator.name
                      : creator.name + ','}
                  </Item>
                )
              )}
            </Items>
          </Tag>
        ) : null}
        <Tag>
          <Label>Companies:</Label>
          <Items>
            {detail.production_companies.map((company, i, companies) => (
              <Item key={company.id}>
                {i === companies.length - 1 ? company.name : company.name + ','}
              </Item>
            ))}
          </Items>
        </Tag>
        <Tag>
          <Label>Contries:</Label>
          <Items>
            {detail.production_countries.map((country, i, countries) => (
              <Item key={country.name}>
                {i === countries.length - 1 ? country.name : country.name + ','}
              </Item>
            ))}
          </Items>
        </Tag>
        <Tag>
          <Label>Genres:</Label>
          <Items>
            {detail.genres.map((genre, i, genres) => (
              <Item key={genre.id}>
                {i === genres.length - 1 ? genre.name : genre.name + ','}
              </Item>
            ))}
          </Items>
        </Tag>
      </About>
    </Wrapper>
  );
}
