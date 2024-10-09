import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentYState, titleState } from './atom';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SubHeader from './components/SubHeader';
import MainLoader from './components/MainLoader';
import { Helmet } from 'react-helmet';

export interface IOutletContext {
  handleOutletRendered: (isRendered: boolean) => void;
  setHideFooter: (hideFooter: boolean) => void;
}
const OutletWrapper = styled.div<{ isOutletRendered: boolean }>`
  ${(props) => (props.isOutletRendered ? '' : 'display:none;')}
`;
function App() {
  const { scrollY } = useScroll();
  const setCurrentY = useSetRecoilState(currentYState);
  const [isOutletRendered, setIsOutletRendered] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);
  const title = useRecoilValue(titleState);
  const { pathname } = useLocation();
  const viewportMeta = document.querySelector('meta[name="viewport"]');

  useMotionValueEvent(scrollY, 'change', (crrY) => {
    setCurrentY(crrY);
  });
  const handleOutletRendered = (isRendered: boolean) => {
    setIsOutletRendered(isRendered);
  };
  useEffect(() => {
    setHideFooter(false);
  }, [pathname]);
  useEffect(() => {
    if (!viewportMeta) return;
    viewportMeta.setAttribute(
      'content',
      'width=device-width, initial-scale=1, minimum-scale=1'
    );
  }, [viewportMeta]);
  return (
    <>
      <Helmet>
        <title>{title + 'Flix Spot'}</title>
      </Helmet>
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
