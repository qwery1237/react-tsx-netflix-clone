import { useEffect } from 'react';
import { IMovie, ITVShow } from '../api';
import { useOutletContext } from 'react-router-dom';
import { IOutletContext } from '../App';
import styled from 'styled-components';

interface IProps {
  videos: IMovie[] | ITVShow[];
  label: string;
  genre: string;
  isLastSlider: boolean;
}
const Wrapper = styled.div``;
const Label = styled.h3`
  font-size: 1.4vw;
  line-height: 1.25vw;
`;
export default function Slider({ videos, label, genre, isLastSlider }: IProps) {
  const { handleOutletRendered } = useOutletContext<IOutletContext>();
  useEffect(() => {
    if (!isLastSlider) return;

    handleOutletRendered(true);
  }, []);
  return (
    <Wrapper>
      <Label>{label}</Label>
    </Wrapper>
  );
}
