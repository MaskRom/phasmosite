import { GhostTable } from "../table/GhostTable";
import React from "react";
import { H3 } from "../../parts/Headline";



type TGhostByEvidenceField = {
  ghost: Array<{
    slug: string;
    name: string;
    level: number;
  }>
}

export const GhostByEvidenceField = (props: TGhostByEvidenceField) => {
  return (
    <>
      <H3 title='この証拠を出すゴースト' />
      <GhostTable ghost={props.ghost} center={true} />
    </>
  );
}