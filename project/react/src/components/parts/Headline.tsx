import { BsQuestionCircleFill } from 'react-icons/bs';
import Tooltip from '@mui/material/Tooltip';
import styled from '@emotion/styled';
import React from 'react';


type TH = {
  title: string;
  help?: string;
}

export const H3 = (props: TH) => {
  return (
    <SH3 className='hd_re'>
      <span className='h_title'>{props.title}</span>
      {props.help &&
        <Tooltip title={props.help} placement="bottom-end" arrow>
          <span className='question_icon'>
            <BsQuestionCircleFill />
          </span>
        </Tooltip>
      }
    </SH3>
  );
}

const SH3 = styled.h3`
  display: flex;
  align-items: center;
  margin: 5px;
  padding: 10px;
  color: #fff;
  background-color: rgb(90, 100, 110);
  border-left: 12px solid rgb(110, 130, 160);
  .h_title {
    font-size: 16px;
  }
  .question_icon {
    margin-right: 0;
    cursor: pointer;
  }
`



export const H4 = (props: TH) => {
  return (
    <SH4 className='hd_re'>
      <span className='h_title'>{props.title}</span>
      {props.help &&
        <Tooltip title={props.help} placement="bottom-end" arrow>
          <span className='question_icon'>
            <BsQuestionCircleFill />
          </span>
        </Tooltip>
      }
    </SH4>
  );
}

const SH4 = styled.h4`
  display: flex;
  align-items: center;
  margin: 5px;
  padding: 7px;
  color: #333;
  border-bottom: solid 2px #bbb;
  border-left: 12px solid #bbb;
  background-color: #ddd;
  .h_title {
    font-size: 18px;
  }
  .question_icon {
    color: rgb(130, 140, 150);
    margin-right: 0;
    cursor: pointer;
  }
`