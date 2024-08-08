import { useMatch } from 'react-router-dom';
import Banner from '../components/Banner';
import Slider from '../components/Slider';
import Preview from '../components/Preview';

export default function Home() {
  const showPreview = useMatch('/react-tsx-netflix-clone/:contentId') !== null;

  return (
    <>
      <Banner />
      <Slider />
      {showPreview && <Preview />}
    </>
  );
}
