import { atom } from 'recoil';
export interface ICurrentContentRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const currentYState = atom({
  key: 'currentY',
  default: 0,
});
