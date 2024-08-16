import { IMovie, ITVShow, ITvShowDetail } from './api';

export const makeImgPath = (id: string, format?: string) =>
  `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
export const getOffset = (width: number) => {
  if (width > 1399) {
    return 6;
  } else if (width > 1099) {
    return 5;
  } else if (width > 799) {
    return 4;
  } else if (width > 499) {
    return 3;
  } else {
    return 2;
  }
};
export const convertTime = (min?: number) => {
  if (!min) return;

  const hours = Math.floor(min / 60);
  const minutes = min % 60;
  return `${hours}h ${minutes}m`;
};
export const getSeasonsOrEpisodes = (detail: ITvShowDetail) => {
  if (detail.number_of_seasons <= 1) {
    if (detail.number_of_episodes <= 1) return 'Limited Series';
    return `${detail.number_of_episodes} Episodes`;
  }
  return `${detail.number_of_seasons} Seasons`;
};
export const capitalizeLabel = (label: string) => {
  const capitalized = label
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return capitalized;
};
export const filterVideos = (videos: IMovie[] | ITVShow[]) => {
  return videos.filter(
    (video) =>
      video.backdrop_path !== null && video.overview && video.vote_count
  );
};
export const getSlicedVideos = (
  videos: IMovie[] | ITVShow[],
  startIndex: number,
  offset: number
) => {
  if (videos.length <= offset) return videos;
  if (startIndex + offset > videos.length) {
    const first = videos.slice(startIndex);
    const last = videos.slice(0, startIndex + offset - videos.length);
    const sliced = [...first, ...last];
    console.log(sliced);

    return sliced;
  }
  const sliced = videos.slice(startIndex, startIndex + offset);
  return sliced;
};
