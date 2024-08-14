import { useEffect, useState } from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { currentYState } from '../atom';
import { motion, useAnimation } from 'framer-motion';

const Wrapper = styled(motion.div)`
  width: 100%;
  position: fixed;
  top: 68px;
  height: 68px;
  z-index: 3;
`;
const navVariant = {
  top: {
    backgroundColor: 'rgba(20, 20, 20,0)',
  },
  scroll: { backgroundColor: 'rgba(20,20,20,1)' },
};
export default function SubHeader() {
  const [showThis, setShowThis] = useState(false);
  const currentY = useRecoilValue(currentYState);
  const location = useLocation();
  const homeMatch = useMatch('/react-tsx-netflix-clone/') !== null;
  const tvMatch = useMatch(baseUrl + 'tv') !== null;
  const movieMatch = useMatch(baseUrl + 'movie') !== null;
  const navAnimation = useAnimation();
  useEffect(() => {
    if (!homeMatch) {
      setShowThis(true);
      return;
    }
    setShowThis(false);
  }, [location]);
  useEffect(() => {
    if (currentY > 0) {
      navAnimation.start('scroll');
    } else {
      navAnimation.start('top');
    }
  }, [currentY]);
  return (
    <>
      {showThis ? (
        <Wrapper variants={navVariant} animate={navAnimation}>
          SubHeader
        </Wrapper>
      ) : null}
    </>
  );
}
