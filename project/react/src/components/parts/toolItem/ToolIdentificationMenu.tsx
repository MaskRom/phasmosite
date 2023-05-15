import {
  toolIdentificationItemValue, toolIdentificationMenu
} from '../../../recoil/toolIdentificationState';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { Button } from '@mui/material';
import styled from 'styled-components';
import React from 'react';



// 特定ツールのトップメニュー(選択リセット,確認可能な証拠数のセット)
export const ToolIdentificationMenu = () => {

  const [identificationValue, setIdentificationValue] = useRecoilState(
    toolIdentificationItemValue);

  const onClickReset = () => {
    for (const i of Object.keys(identificationValue)) {
      setIdentificationValue((identificationValue: any) => {
        return (
          { ...identificationValue, ...{ [i]: 0 } }
        );
      })
    }
  };


  const [identificationMenu, setIdentificationMenu] = useRecoilState(
    toolIdentificationMenu);

  const maxEvidenceValue = 3;

  const onClickEvidenceLeft = () => {
    const nowEvidenceValue = identificationMenu.evidence;
    if (nowEvidenceValue > 0) {
      setIdentificationMenu({
        ...identificationMenu, ...{ evidence: nowEvidenceValue - 1 }
      })
    }
  };

  const onClickEvidenceRight = () => {
    const nowEvidenceValue = identificationMenu.evidence;
    if (nowEvidenceValue < maxEvidenceValue) {
      setIdentificationMenu({
        ...identificationMenu, ...{ evidence: nowEvidenceValue + 1 }
      })
    }
  };

  return (
    <SToolIdentificationMenu>
      <div>
        <Button color='error' variant='outlined' onClick={onClickReset}>
          選択リセット
        </Button>
      </div>
      <div>
        {/* <p>確認可能な証拠数</p>
        <div className='s_evi'>
          <button className='s_icon' onClick={onClickEvidenceLeft}><AiOutlineLeft /></button>
          <span className='s_num'>{identificationMenu.evidence}</span>
          <button className='s_icon' onClick={onClickEvidenceRight}><AiOutlineRight /></button>
        </div> */}
      </div>
    </SToolIdentificationMenu>
  )
}

const SToolIdentificationMenu = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  padding-block-start: 5px;
  font-weight: bold;
  button {
    font-size: 1em;
  }
  .s_evi {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .s_num{
      font-size: 1.1rem;
    }
    .s_icon{
      font-size: 1.5rem;
      color:#000;
      padding: 2px;
      display: flex;
      cursor: pointer;
    }
  }
`;