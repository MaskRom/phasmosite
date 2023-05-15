import { atom } from 'recoil'
import Style from '../types/TyStyle';


// Style by URL
export const styleByURLState = atom<Style>({
  key: 'styleByURLState',
  default: {
    title: '',
    isHeaderTop: true,
    nav: false,
    pageAlert: false,
    button: '',
    side: true,
    back: '/',
  },
});
