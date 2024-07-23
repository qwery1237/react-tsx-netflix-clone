import { useEffect, useState } from 'react';
interface IScreenSize {
  width: number;
  height: number;
}
function getScreenSize(): IScreenSize {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  const onResize = () => setScreenSize(getScreenSize);
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return screenSize;
}
