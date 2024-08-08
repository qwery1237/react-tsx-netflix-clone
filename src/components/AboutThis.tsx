import styled from 'styled-components';
import { IMovieDetail } from '../api';

interface IAboutProps {
  detail: IMovieDetail;
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
  console.log(detail);

  return (
    <Wrapper>
      <Header>
        About <Title>{detail.title}</Title>
      </Header>
      <About>
        <Tag>
          <Label>Companies:</Label>
          <Items>
            {detail.production_companies.map((company, i, companies) => (
              <Item>
                {i === companies.length - 1 ? company.name : company.name + ','}
              </Item>
            ))}
          </Items>
        </Tag>
        <Tag>
          <Label>Contries:</Label>
          <Items>
            {detail.production_countries.map((country, i, countries) => (
              <Item>
                {i === countries.length - 1 ? country.name : country.name + ','}
              </Item>
            ))}
          </Items>
        </Tag>
        <Tag>
          <Label>Genres:</Label>
          <Items>
            {detail.genres.map((genre, i, genres) => (
              <Item>
                {i === genres.length - 1 ? genre.name : genre.name + ','}
              </Item>
            ))}
          </Items>
        </Tag>
      </About>
    </Wrapper>
  );
}
