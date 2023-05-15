export type TyToolDifficulty = Array<{
  name: string;
  help: string;
  item: Array<{
    id: number;
    name: string;
    text: string;
    default: number;
    hide_order: string | null,
    value: Array<{
      value: string;
      magn: number;
      order: number;
    }>
  }>
}>


export type TyToolDifficultyPreset = Array<{
  name: string;
  image: string;
  params: string;
}>