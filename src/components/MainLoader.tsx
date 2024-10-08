import styled, { keyframes } from 'styled-components';
import { getOffset } from '../utils';
import useScreenSize from '../hooks/useScreenSize';
const pulsate = keyframes`
  from {
    background-color: #1a1a1a;
  }
  25% {
    background-color: #333;
  }
  50% {
    background-color: #1a1a1a;
  }
  to {
    background-color: #1a1a1a;
  }
`;
const Wrapper = styled.div`
  margin-top: 198px;
  width: 100%;
  display: flex;
  gap: 4px;
  padding: ${(props) => props.theme.paddingContainer};
`;
const Box = styled.div<{ boxWidth: number; delay: number }>`
  width: ${(props) => props.boxWidth + 'px'};
  aspect-ratio: 11/6;
  border-radius: 3px;
  background-color: #1a1a1a;
  animation: ${pulsate} 3.6s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
`;
export default function MainLoader() {
  const { width } = useScreenSize();
  const offset = getOffset(width);
  const loader = Array(offset).fill(1);
  const boxWidth = (width * 0.92 - 4 * (offset + 1)) / offset;

  return (
    <Wrapper>
      {loader.map((_, i) => (
        <Box key={i} boxWidth={boxWidth} delay={i * 0.2} />
      ))}
    </Wrapper>
  );
}
