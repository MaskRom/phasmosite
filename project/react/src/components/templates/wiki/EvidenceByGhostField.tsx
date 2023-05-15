import { EvidenceByGhostTable } from '../table/EvidenceByGhostTable';
import { EvidenceAllTable } from '../table/EvidenceAllTable';
import React from 'react';
import { H3 } from '../../parts/Headline';



type TEvidenceByGhostField = {
  evidence: Array<{
    slug: string;
    name: string;
    possibility: number;
    confirm: boolean;
  }>
};

export const EvidenceByGhostField = (prpps: TEvidenceByGhostField) => {

  const { evidence } = prpps;
  const mainEvidence = [];
  const subEvidence = [];

  for (const i in evidence) {
    if (evidence[i].possibility === 100) {
      mainEvidence.push(evidence[i]);
    } else {
      subEvidence.push(evidence[i]);
    };
  };

  return (
    <>
      <H3
        title='証拠'
        help='
          ゴーストは以下の３つの証拠を出します。
          確定の証拠の場合、証拠の数が制限されている難易度（カスタム難易度やナイトメア以上の難易度）
          では優先されます。
        '
      />
      <EvidenceByGhostTable evidence={mainEvidence} />
      {subEvidence.length ?
        <>
          <H3
            title='その他の証拠'
            help='
              メインの３つの証拠以外に以下の証拠を出します。
              この証拠はメインの証拠ではないので、証拠が３つ出ない難易度でも必ず出ます。
            '
          />
          <EvidenceAllTable evidence={subEvidence} />
        </>
        : ''}

    </>
  );
};