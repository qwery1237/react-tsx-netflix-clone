import styled from 'styled-components';
import { getOffset } from '../utils';
import useScreenSize from '../hooks/useScreenSize';

const Wrapper = styled.div`
  margin-top: 198px;
  width: 100%;
  display: flex;
  gap: 4px;
  padding: ${(props) => props.theme.paddingContainer};
`;
const Box = styled.div<{ boxWidth: number }>`
  width: ${(props) => props.boxWidth + 'px'};
  aspect-ratio: 11/6;
  border-radius: 3px;
  background-color: #1a1a1a;
`;
export default function MainLoader() {
  const { width } = useScreenSize();
  const offset = getOffset(width);
  const loader = Array(offset).fill(1);
  const boxWidth = (width * 0.92 - 4 * (offset + 1)) / offset;
  console.log(loader);

  return (
    <Wrapper>
      {loader.map((_, i) => (
        <Box key={i} boxWidth={boxWidth} />
      ))}
    </Wrapper>
  );
}
