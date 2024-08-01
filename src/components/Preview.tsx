import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
`;
export default function Preview() {
  const { contentId } = useParams();
  console.log(contentId);

  return (
    <AnimatePresence>
      <Wrapper>sth</Wrapper>
    </AnimatePresence>
  );
}
