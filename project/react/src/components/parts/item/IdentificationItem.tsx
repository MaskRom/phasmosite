import { toolIdentificationItemValue } from '../../../recoil/toolIdentificationState';
import { BsCheck2, BsQuestionCircleFill, BsXLg } from 'react-icons/bs';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { Tooltip } from '@mui/material';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useEffect } from 'react';
import React from 'react';


type TIdentificationItem = {
  id: string;
  text: string;
  help?: string;
}

export const IdentificationItem = (props: TIdentificationItem) => {
  // 項目値セット(0: 選択なし, 1: 選択中, 2: 排除中)
  const [identificationValue, setIdentificationValue] = useRecoilState(
    toolIdentificationItemValue);

  useEffect(() => {
    if (identificationValue[props.id] === undefined) {

      setIdentificationValue((identificationValue: any) => {
        return (
          { ...identificationValue, ...{ [props.id]: 0 } }
        );
      })
    }
  }, []);

  const itemOnClick = () => {
    setIdentificationValue(((identificationValue: any) => {
      return (
        {
          ...identificationValue, ...{
            [props.id]: (identificationValue[props.id] + 1) % 3,
          }
        }
      )
    }))
  };

  return (
    <SIdentificationItem
      className={
        identificationValue[props.id] === 1 ? 'check' :
          identificationValue[props.id] === 2 ? 'exclu' : ''
      }
    >
      <div className='s_help'>
        {props.help &&
          <Tooltip title={props.help} placement='bottom-start' disableInteractive>
            <span className='s_icon_help'>
              <BsQuestionCircleFill />
            </span>
          </Tooltip>
        }
      </div>
      <button className='s_checkbox' onClick={itemOnClick}>
        <div className='s_checkbox_icon'>
          {
            identificationValue[props.id] === 1 &&
            <BsXLg className='s_icon check' />
          }
          <ImCheckboxUnchecked className='s_icon' />
        </div>
        <p>
          {props.text}
        </p>
      </button>
    </SIdentificationItem >
  );
}

const SIdentificationItem = styled.span`
  display: grid;
  grid-template-columns: auto 1fr;
  padding-block: 10px;
  user-select: none;
  p {
    padding-inline: 5px;
    font-weight: bold;
    text-align: left;
  }
  .s_help{
    .s_icon_help{
      color: #179;
      cursor: pointer;
      svg {
      font-size: 15px;
      margin-inline: 4px;
      }
    }
  }
  .s_checkbox{
    display: flex;
    .s_checkbox_icon{
      position: relative;
      padding-inline: 5px;
    }
    .s_icon{
      font-size: 1rem;
      &.check{
        z-index: 1;
        position: absolute;
        color: limegreen;
        color: #af0000;
        font-size: 1.44rem;
        top: -4px;
        left: 1px;
      }
    }
  }
  &.check{
    
  }
  &.exclu .s_checkbox {
    color: #aaa;
    position: relative;
    &::after {
      position: absolute;
      content: "";
      width: 90%;
      height: 2px;
      left: 5px;
      bottom: 60%;
      transform: rotate(0);
      background-color: #333;
    }
  }
`;