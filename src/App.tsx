import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { currentYState } from './atom';
import Footer from './components/Footer';
import { useState } from 'react';
import styled from 'styled-components';
import SubHeader from './components/SubHeader';
export interface IOutletContext {
  handleOutletRendered: (isRendered: boolean) => void;
}
const Page = styled.div<{ showContent: boolean }>`
  ${(props) => (!props.showContent ? 'display:none' : '')}
`;
function App() {
  const { scrollY } = useScroll();
  const setCurrentY = useSetRecoilState(currentYState);
  const [isOutletRendered, setIsOutletRendered] = useState(true);
  useMotionValueEvent(scrollY, 'change', (crrY) => {
    setCurrentY(crrY);
  });
  const handleOutletRendered = (isRendered: boolean) => {
    setIsOutletRendered(isRendered);
  };

  return (
    <Page showContent={isOutletRendered}>
      <Header />
      <SubHeader />
      <Outlet context={{ handleOutletRendered }} />
      <Footer />
    </Page>
  );
}

export default App;
