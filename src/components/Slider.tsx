import { useEffect } from 'react';
import { IMovie, ITVShow } from '../api';
import { useOutletContext } from 'react-router-dom';
import { IOutletContext } from '../App';

interface IProps {
  videos: IMovie[] | ITVShow[];
  label: string;
  genre: string;
  isLastSlider: boolean;
}
export default function Slider({ videos, label, genre, isLastSlider }: IProps) {
  const { handleOutletRendered } = useOutletContext<IOutletContext>();
  useEffect(() => {
    if (!isLastSlider) return;
    handleOutletRendered(true);
  }, []);
  return <div></div>;
}
