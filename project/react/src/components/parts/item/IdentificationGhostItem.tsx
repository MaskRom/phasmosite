import {
  toolIdentificationGhostMagn,
  toolIdentificationGhostValue,
  toolIdentificationItemValue,
  toolIdentificationMenu,
} from '../../../recoil/toolIdentificationState';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { evidenceTopAPIState } from '../../../recoil/APIState';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import React from 'react';


type TIdentificationGhostItem = {
  slug: string;
  name: string;
}

// ゴースト別のパーセンテージ表示アイテム
export const IdentificationGhostItem = (props: TIdentificationGhostItem) => {

  // 現在選択されている項目*ゴーストの倍率を掛けた値をRecoilに更新
  const identificationMenu = useRecoilValue(toolIdentificationMenu);
  const evidenceTopAPI = useRecoilValueLoadable(evidenceTopAPIState);
  const identificationGhostMagn = useRecoilValueLoadable(toolIdentificationGhostMagn);
  const identificationValue = useRecoilValue(toolIdentificationItemValue);
  const [identificationGhostValue, setIdentificationGhostValue] = useRecoilState(
    toolIdentificationGhostValue);
  // ゴースト重み付け初期化
  useEffect(() => {
    if (identificationGhostValue[props.slug] === undefined) {
      setIdentificationGhostValue(((i: any) => {
        return { ...i, ...{ [props.slug]: 1 } }
      }))
    }
  }, []);
  // ゴースト重み付け計算
  const eviList: any = Object.keys(evidenceTopAPI.contents).map(function (key) { return evidenceTopAPI.contents[key].slug; });
  useEffect(() => {
    const eviSum = identificationMenu.evidence;

    let ghostValueObj: any = {};
    identificationGhostMagn.contents.forEach((element: any) => {
      ghostValueObj[element.slug] = element.factor;
    });
    let weighting = 1;
    for (const i of Object.keys(identificationValue)) {

      if (identificationValue[i] === 0) {
        // pass
      } else if (identificationValue[i] === 1) {

        if (ghostValueObj[props.slug][i] === undefined) {
          if (eviList.includes(i)) {
            weighting = 0;
          } else {
            weighting = weighting * 0.5;
          }
        } else {
          weighting = weighting * (ghostValueObj[props.slug][i] / 100);
        }
      } else if (identificationValue[i] === 2) {

        if (ghostValueObj[props.slug][i] === undefined) {
          if (eviList.includes(i)) {
            // pass
          } else {
            weighting = weighting * 0.5;
          }
        } else {
          weighting = weighting * (1 - (ghostValueObj[props.slug][i] / 100));
        }
      }
    }
    setIdentificationGhostValue((identificationGhostValue: any) => {
      return { ...identificationGhostValue, ...{ [props.slug]: weighting } }
    })
  }, [identificationValue, identificationMenu.evidence]);

  // ゴーストパーセンテージ計算
  const [percent, setPercent] = useState<string>('0.00');
  useEffect(() => {
    let sum: number = 0;
    for (const i of Object.keys(identificationGhostValue)) {
      sum = sum + identificationGhostValue[i];
    }
    const per: number = (sum ? 100 * identificationGhostValue[props.slug] / sum : 0);
    setPercent(per.toFixed(1));
  }, [identificationGhostValue]);


  return (
    <SIdentificationGhostItem className={percent === '0.0' ? 'none' : ''}>
      <Tooltip title={props.name} disableInteractive>
        <Link to={`/wiki/ghost/${props.slug}`}>
          <span className='s_value'>{percent}<span className='s_pars'>%</span></span>
          <span className='s_name'>{props.name.length > 8 ? `${props.name.slice(0, 7)}…` : props.name}</span>
        </Link>
      </Tooltip>
    </SIdentificationGhostItem>
  );
}


const SIdentificationGhostItem = styled.span`
  margin: 1px;
  border-radius: 1px;
  text-align: center;
  font-weight: bold;
  border :2px rgb(0,0,0,0) solid;
  &.none{
    a {
      color: #ccc;
    }
  }
  &:hover {
    border :2px rgb(30, 155, 240) solid;
  }
  a {
    display: block;
    text-decoration: none;
    color: #000;
  }
  .s_value{
    display:block;
    .s_pars{
      font-size: 0.4rem;
    }
  }
  .s_name {

  }
`;