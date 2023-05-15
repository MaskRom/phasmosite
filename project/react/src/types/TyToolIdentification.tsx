export type TyToolIdentificationGhost = Array<{
  slug: string;
  factor: any;
}>;



export type TyToolIdentificationItem = Array<{
  name: string;
  help: string | null;
  curse: string | null;
  item: Array<{
    id: string;
    text: string;
    help: string;
  }>
}>;