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
