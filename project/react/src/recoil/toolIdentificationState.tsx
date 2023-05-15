import {
  TyToolIdentificationGhost,
  TyToolIdentificationItem
} from '../types/TyToolIdentification';
import { atom, selector } from 'recoil'
import { api } from '../axios';



// 特定ツールAPIゴースト別
export const toolIdentificationGhostMagn = atom<TyToolIdentificationGhost>({
  key: 'toolIdentificationGhostMagn',
  default: selector({
    key: 'getToolIdentificationGhost',
    get: async ({ get }) => {
      try {
        const response = await api('/identification/');
        const toolIdentificationGhostMagnList = await response.data;
        return toolIdentificationGhostMagnList;
      }
      catch (err) {
        throw err;
      }
    }
  }),
});


// 特定ツールAPI特徴項目
export const toolIdentificationItemState = atom<TyToolIdentificationItem>({
  key: 'toolIdentificationItemState',
  default: selector({
    key: 'getToolIdentificationItem',
    get: async ({ get }) => {
      try {
        const response = await api('/identification/?item=1');
        const toolIdentificationItemStateList = await response.data;
        return toolIdentificationItemStateList;
      }
      catch (err) {
        throw err;
      }
    }
  }),
});



// 特定ツールAPI特徴項目値
export const toolIdentificationItemValue = atom<any>({
  key: 'toolIdentificationItemValue',
  default: {
  }
});



// 特定ツールゴーストの重み付け
export const toolIdentificationGhostValue = atom<any>({
  key: 'toolIdentificationGhostValue',
  default: {
  }
});


// 特定ツール用メニュー
export const toolIdentificationMenu = atom<any>({
  key: 'toolIdentificationMenu',
  default: {
    evidence: 3,
    curse: {},
  }
});