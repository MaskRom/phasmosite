import {
  TyToolDifficulty,
  TyToolDifficultyPreset
} from '../types/TyToolDifficulty';
import { atom, selector } from 'recoil'
import { api } from '../axios';



// カスタム難易度API
export const toolDifficultyState = atom<TyToolDifficulty>({
  key: 'toolDifficultyState',
  default: selector({
    key: 'getToolDifficulty',
    get: async ({ get }) => {
      try {
        const response = await api('/customdifficulty/');
        const customdifficultyList = await response.data;
        return customdifficultyList;
      }
      catch (err) {
        throw err;
      }
    }
  }),
});



// カスタム難易度設定値
export const toolDifficultyValueState = atom<any>({
  key: 'toolDifficultyValueState',
  default: {
    text: '',
  },
});



// カスタム難易度テンプレート
export const toolDifficultyPreset = atom<TyToolDifficultyPreset>({
  key: 'toolDifficultyPreset',
  default: selector({
    key: 'getToolDifficultyPreset',
    get: async ({ get }) => {
      try {
        const response = await api('/customdifficulty/preset/');
        const presetList = await response.data;
        return presetList;
      }
      catch (error) {
        throw error;
      }
    }
  })
});