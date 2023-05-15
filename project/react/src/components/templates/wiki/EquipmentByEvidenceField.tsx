import React from "react";
import { H3 } from "../../parts/Headline";
import { EvidenceAllField } from "../field/center/EvidenceAllField";
import { EvidenceAllTable } from "../table/EvidenceAllTable";

type TEquipmentByEvidenceField = {
  evidence: Array<{
    slug: string;
    name: string;
    text: string | null;
  }>
}
export const EquipmentByEvidenceField = (props: TEquipmentByEvidenceField) => {
  if(!props.evidence.length) return null;
  return (
    <>
      <H3 title='特定可能な証拠' help='このアイテムを使用することで以下の証拠を特定することが可能です。'/>
      <EvidenceAllTable evidence={props.evidence} />
    </>
  )
}