import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { currentYState } from './atom';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SubHeader from './components/SubHeader';
import MainLoader from './components/MainLoader';

export interface IOutletContext {
  handleOutletRendered: (isRendered: boolean) => void;
  setHideFooter: (hideFooter: boolean) => void;
}
const OutletWrapper = styled.div<{ isOutletRendered: boolean }>`
  ${(props) => (props.isOutletRendered ? '' : 'display:none;')}
`;
function App() {
  console.warn = () => {};
  const { scrollY } = useScroll();
  const setCurrentY = useSetRecoilState(currentYState);
  const [isOutletRendered, setIsOutletRendered] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);
  const { pathname } = useLocation();
  useMotionValueEvent(scrollY, 'change', (crrY) => {
    setCurrentY(crrY);
  });
  const handleOutletRendered = (isRendered: boolean) => {
    setIsOutletRendered(isRendered);
  };
  useEffect(() => {
    setHideFooter(false);
  }, [pathname]);
  return (
    <>
      <Header
        isOutletRendered={isOutletRendered}
        handleOutletRendered={handleOutletRendered}
      />
      <SubHeader handleOutletRendered={handleOutletRendered} />
      {isOutletRendered ? null : <MainLoader />}
      <OutletWrapper isOutletRendered={isOutletRendered}>
        <Outlet context={{ handleOutletRendered, setHideFooter }} />
      </OutletWrapper>
      {hideFooter ? null : <Footer />}
    </>
  );
}

export default App;
