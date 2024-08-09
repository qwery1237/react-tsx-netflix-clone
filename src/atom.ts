import { IMovie } from './api';
import { atom } from 'recoil';
export interface ICurrentContentRect {
  x: number;
  y: number;
  width: number;
  height: number;
}
export const defaultMovie: IMovie = {
  id: 0,
  title: '',
  overview: '',
  poster_path: '',
  backdrop_path: '',
  release_date: '',
  genre_ids: [],
  original_language: '',
  original_title: '',
  popularity: 0,
  vote_average: 0,
  vote_count: 0,
  adult: false,
  video: false,
};
export const currentYState = atom({
  key: 'currentY',
  default: 0,
});
export const bannerMovieState = atom<IMovie>({
  key: 'bannerMovie',
  default: defaultMovie,
});
