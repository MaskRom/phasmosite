import { HuntlineTable } from '../table/HuntlineTable';
import React from 'react';
import { H3 } from '../../parts/Headline';



type THuntlineField = {
  huntline: Array<{
    text: string,
    sanity: number
  }>
};

export const HuntlineField = (props: THuntlineField) => {
  return (
    <>
      <H3
        title='ハントが起こりうる正気度'
        help='
          ゴーストは基本的にプレイヤーの正気度（マルチプレイでは平均正気度）によってハントを起こすかどうかを判断します。
          以下の状況でそのハントラインを切っているとハントが起きる可能性があります。
        '
      />
      {props.huntline &&
        <HuntlineTable huntline={props.huntline} />
      }
    </>
  );
};