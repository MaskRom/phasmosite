import { ItemTable } from "../table/ItemTable";
import React from "react";
import { H3 } from "../../parts/Headline";


type TIdentifiableField = {
  identifiable: Array<{
    slug: string;
    name: string;
    image1: string | null;
    text: string | null;
  }>
}

export const IdentifiableField = (props: TIdentifiableField) => {
  return (
    <>
      <H3 title='特定可能なアイテム' help='以下のアイテムを使用することよってこの証拠を特定することができます。' />
      <ItemTable item={props.identifiable} center={true} url='wiki/equipment' />
    </>
  );
}