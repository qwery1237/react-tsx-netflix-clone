import axios from 'axios';

const API_KEY = 'a467db69048c41114e360cf1b32a063f';
const BASE_URL = 'https://api.themoviedb.org/3';
export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export const getMovies = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY} `
  );

  const movies: IMovie[] = data.results;

  return movies;
};
