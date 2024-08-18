import styled from 'styled-components';

const Text = styled.div`
  padding-top: 50vh;
  margin-bottom: 25vh;
  width: 100%;
  text-align: center;
  font-size: 3vw;
`;
export default function NoContent() {
  return <Text>There is no available content.</Text>;
}
