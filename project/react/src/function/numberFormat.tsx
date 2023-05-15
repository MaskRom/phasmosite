export const numberFormat = (num: number, favorited?: boolean, defaultNum?: boolean) => {
  if (favorited) num++;
  if (defaultNum) num --;
  if (num < 10000) return num.toLocaleString();
  else return '1万以上';
}