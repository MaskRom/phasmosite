import { TyModal } from '../types/TyModal';
import { atom } from 'recoil'
import React from 'react';



export const modalState = atom<TyModal>({
  key: 'modalState',
  default: {
    post: {
      tags: [],
      source: undefined,
      open: () => { },
    },
    image: {
      url: '',
      open: () => { },
    },
  },
});
