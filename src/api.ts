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
export interface IMovieDetail {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{ iso_639_1: string; name: string }>;
  status: string;
  tagline: string;
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
export const getMovieDetail = async (movieId?: string) => {
  if (!movieId) return;
  const { data } = await axios.get<IMovieDetail>(`
https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);

  return data;
};

export const getBannerMovie = async () => {
  const movies = await getMovies();
  return movies[0];
};

export const getSimilarMovies = async (movieId?: string) => {
  if (!movieId) return;
  const { data } = await axios.get(`
    https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`);
  const similars: IMovie[] = data.results;
  console.log(similars);

  return similars;
};
