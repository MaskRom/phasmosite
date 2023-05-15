import { atom, selector } from 'recoil'
import axios from "axios";
// type
import { TAlert } from '../types/TyAPI';
import { TSlideshow } from '../types/TyAPI';
import { TTagsTop } from '../types/TyAPI';
import { TGhostTop } from '../types/TyAPI';
import { TEquipmentTop } from '../types/TyAPI';
import { TCurseItemTop } from '../types/TyAPI';
import { TEvidenceTop } from '../types/TyAPI';
import { TMapTop } from '../types/TyAPI';
import { TPostTop } from '../types/TyAPI';
import { TArticleTop } from '../types/TyAPI';

import { api } from '../axios';



// API asynchronous communication
// Page Alert
export const alertAPIState = atom<TAlert[]>({
  key: 'alertAPI',
  default: selector({
    key: 'getAlertAPI',
    get: async ({ get }) => {
      try {
        const response = await api('/alert/');
        const alertList = await response.data;
        return alertList;
      }
      catch (error) {
        throw error;
      }
    }
  })
});


// slideshow
export const slideshowAPIState = atom<TSlideshow[]>({
  key: 'slideshowAPI',
  default: selector({
    key: 'getSlideshowAPI',
    get: async ({ get }) => {
      try {
        const response = await api('/slideshow/');
        const slideshowList = await response.data;
        return slideshowList;
      }
      catch (error) {
        throw error;
      }
    }
  })
});


// tagsTop
export const tagsTopAPIState = atom<TTagsTop[]>({
  key: 'tagsTopAPI',
  default: selector({
    key: 'getTagsTopAPI',
    get: async ({ get }) => {
      try {
        const response = await api('/tags/');
        const tagsTopList = await response.data;
        return tagsTopList;
      }
      catch (error) {
        throw error;
      }
    }
  })
});


// ghostTop
export const ghostTopAPIState = atom<TGhostTop[]>({
  key: 'ghostTopAPI',
  default: selector({
    key: 'getGhostTopAPI',
    get: async ({ get }) => {
      try {
        const response = await api('/ghosts/');
        const ghostTopList = await response.data;
        return ghostTopList;
      }
      catch (error) {
        throw error;
      }
    }
  })
});


// equipmentTop
export const equipmentTopAPIState = atom<TEquipmentTop[]>({
  key: 'equipmentTopAPI',
  default: selector({
    key: 'getEquipmentTopAPI',
    get: async ({ get }) => {
      try {
        const response = await api('/equipments/');
        const equipmentTopList = await response.data;
        return equipmentTopList;
      }
      catch (error) {
        throw error;
      }
    }
  })
});


// curseItemTop
export const cursedItemTopAPIState = atom<TCurseItemTop[]>({
  key: 'cursedItemTopAPI',
  default: selector({
    key: 'getCursedItemTopAPI',
    get: async ({ get }) => {
      try {
        const response = await api('/curseditems/');
        const cursedItemTopList = await response.data;
        return cursedItemTopList;
      }
      catch (error) {
        throw error;
      }
    }
  })
});


// evidenceTop
export const evidenceTopAPIState = atom<TEvidenceTop[]>({
  key: 'evidenceTopAPI',
  default: selector({
    key: 'getEvidenceTopAPI',
    get: async ({ get }) => {
      try {
        const response = await api('/evidence/');
        const evidenceTopList = await response.data;
        return evidenceTopList;
      }
      catch (error) {
        throw error;
      }
    }
  })
});



// mapTop
export const mapTopAPIState = atom<TMapTop[]>({
  key: 'mapTopAPI',
  default: selector({
    key: 'getMapTopAPI',
    get: async ({ get }) => {
      try {
        const response = await api('/maps/');
        const mapTopList = await response.data;
        return mapTopList;
      }
      catch (error) {
        throw error;
      }
    }
  })
});



// postTop
export const postTopAPIState = atom<TPostTop[]>({
  key: 'postTopAPI',
  default: selector({
    key: 'getPostTopAPI',
    get: async ({ get }) => {
      try {
        const response = await api('/posts/?sort=true/');
        const postTopList = await response.data;
        return postTopList;
      }
      catch (error) {
        throw error;
      }
    }
  })
});



// articleTop
export const articleTopAPIState = atom<TArticleTop[]>({
  key: 'articleTopAPI',
  default: selector({
    key: 'getArticleTopAPI',
    get: async ({ get }) => {
      try {
        const response = await api('/articles/');
        const articleTopList = await response.data;
        return articleTopList;
      }
      catch (error) {
        throw error;
      }
    }
  })
});