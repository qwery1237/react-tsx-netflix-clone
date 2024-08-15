import axios from 'axios';
import { capitalizeLabel, filterVideos } from './utils';

const API_KEY = 'a467db69048c41114e360cf1b32a063f';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface IGenre {
  id: number;
  name: string;
}
export interface IVideo {
  label: string;
  results: IMovie[] | ITVShow[];
  genre: string;
}
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
export interface ITVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  origin_country: string[];
  popularity: number;
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
export interface ITvShowDetail {
  backdrop_path: string;
  created_by: Array<{
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }>;
  episode_run_time: number[];
  first_air_date: string;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  next_episode_to_air: null | {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  networks: Array<{
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }>;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
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
  seasons: Array<{
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }>;
  spoken_languages: Array<{ iso_639_1: string; name: string }>;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
export enum movieCategories {
  'NOW_PLAYING' = 'now_playing',

  'TOP_RATED' = 'top_rated',
}
export enum tvCategories {
  'AIRING_TODAY' = 'airing_today',

  'TOP_RATED' = 'top_rated',
}

export const getMovieDetail = async (videoId?: string, genre?: string) => {
  if (!videoId || !genre) return;

  const { data } = await axios.get<IMovieDetail | ITvShowDetail>(`
${BASE_URL}/${genre}/${videoId}?api_key=${API_KEY}`);

  return data;
};

export const getSimilarVideos = async (videoId?: string, genre?: string) => {
  if (!videoId || !genre) return;

  const { data } = await axios.get(`
    ${BASE_URL}/${genre}/${videoId}/similar?api_key=${API_KEY}`);
  const similars = filterVideos(data.results);

  return similars;
};

export const getAllVideos = async () => {
  const videos: IVideo[] = [];
  const movies = await getMovies();
  const tvShows = await getTvShows();

  movies.forEach((_, i) => {
    videos.push(movies[i]);
    videos.push(tvShows[i]);
  });

  return videos;
};
export const getMovies = async () => {
  const categories = Object.values(movieCategories);
  const movies = await Promise.all(
    categories.map(async (category) => {
      const { data } = await axios.get(`
${BASE_URL}/movie/${category}?api_key=${API_KEY}`);

      const results = filterVideos(data.results) as IMovie[];

      if (category === movieCategories.TOP_RATED) {
        return {
          label: `${capitalizeLabel(category)} Movies`,
          results,
          genre: 'movie',
        };
      } else {
        return { label: capitalizeLabel(category), results, genre: 'movie' };
      }
    })
  );

  return movies;
};
export const getTvShows = async () => {
  const categories = Object.values(tvCategories);
  const tvShows = await Promise.all(
    categories.map(async (category) => {
      const { data } = await axios.get(`
${BASE_URL}/tv/${category}?api_key=${API_KEY}`);

      const results = filterVideos(data.results) as ITVShow[];

      if (category === tvCategories.TOP_RATED) {
        return {
          label: `${capitalizeLabel(category)} Tv Shows`,
          results,
          genre: 'tvShow',
        };
      } else {
        return {
          label: capitalizeLabel(category),
          results,
          genre: 'tvShow',
        };
      }
    })
  );
  return tvShows;
};
export const getMovieGenres = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );
  const genres: IGenre[] = data.genres;
  return genres;
};
export const getTvGenres = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/genre/tv/list?api_key=${API_KEY}`
  );
  const genres: IGenre[] = data.genres;
  return genres;
};
