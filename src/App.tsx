import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { currentYState } from './atom';

function App() {
  const { scrollY } = useScroll();
  const setCurrentY = useSetRecoilState(currentYState);
  useMotionValueEvent(scrollY, 'change', (crrY) => {
    setCurrentY(crrY);
  });
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
