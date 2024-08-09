import { motion } from 'framer-motion';
import { SiNetflix } from 'react-icons/si';
import styled from 'styled-components';
import { makeImgPath } from '../utils';
import { useRecoilValue } from 'recoil';
import { bannerMovieState } from '../atom';

const BannerWrapper = styled.div<{ bgImg: string }>`
  width: 100vw;
  height: 56.25vw;
  padding: ${(props) => props.theme.paddingContainer};
  background-image: linear-gradient(
      to bottom,
      rgba(20, 20, 20, 0),
      rgba(20, 20, 20, 0) 70%,
      rgba(20, 20, 20, 1) 100%
    ),
    url(${(props) => props.bgImg});
  background-size: cover;
  background-position: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleWrapper = styled(motion.div)`
  transform-origin: bottom left;
`;
const TitleLogo = styled.div`
  font-size: 2vw;
  letter-spacing: 0.5vw;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: #c2c3c2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  svg {
    width: 1.5em;
    height: 1.5em;
    fill: ${(props) => props.theme.red};
  }
`;
const Title = styled.h1`
  max-width: 600px;
  font-size: 5vw;
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;
const Overview = styled(motion.p)`
  font-size: 1.2vw;
  width: 45%;
`;
const titleVariants = {
  initial: { scale: 1 },
  animate: { scale: 0.5, transition: { delay: 4, duration: 0.3 } },
};
const overviewVariants = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 0, y: '25px', transition: { delay: 4, duration: 0.3 } },
};
export default function Banner() {
  const banner = useRecoilValue(bannerMovieState);

  if (!banner) {
    return <></>;
  }

  return (
    <BannerWrapper bgImg={makeImgPath(banner.backdrop_path)}>
      <TitleWrapper
        variants={titleVariants}
        initial='initial'
        animate='animate'
      >
        <TitleLogo>
          <SiNetflix />
          SERIES
        </TitleLogo>
        <Title>{banner.title.toUpperCase()}</Title>
      </TitleWrapper>
      <Overview variants={overviewVariants} initial='initial' animate='animate'>
        {banner.overview}
      </Overview>
    </BannerWrapper>
  );
}
