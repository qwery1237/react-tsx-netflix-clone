import { SiGithub, SiLinkedin } from 'react-icons/si';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0;
  flex-direction: column;
  align-items: center;
`;
const Socials = styled.div`
  display: flex;
  font-size: 24px;
  gap: 12px;
  margin-bottom: 8px;
`;
const Info = styled.div`
  color: #808080;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 36px;
`;
const Email = styled.span``;

const Year = styled.span``;
const Name = styled.span``;
export default function Footer() {
  return (
    <Wrapper>
      <Socials>
        <a href={'https://github.com/qwery1237'} target='_blank'>
          <SiGithub />
        </a>
        <a href={'https://www.linkedin.com/in/jinsooson/'} target='_blank'>
          <SiLinkedin />
        </a>
      </Socials>
      <Info>
        <Email>jinsu4768@gmail.com</Email>

        <Name>Jinsoo Son</Name>
        <Year>2024</Year>
      </Info>
    </Wrapper>
  );
}
