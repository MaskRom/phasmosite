import { BsQuestionCircleFill } from 'react-icons/bs';
import { BiChevronRight } from 'react-icons/bi';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';
import { useState } from 'react'
import React from 'react';



type TFleldTool = {
  children: React.ReactNode;
  title: string;
  fold: boolean;
  help?: string;
  bottom?: boolean;
  small?: boolean;
}

export const FieldTool = (props: TFleldTool) => {
  const { title, fold, children } = props;
  const [open, setOpen] = useState(fold);
  const onClick = () => setOpen((prev: boolean) => !prev);

  return (
    <SField className={`${props.small && 'small'}`}>
      <h2 className='field_head hd_re'>
        <span>{title}</span>
        {props.help &&
          <Tooltip title={props.help} placement="bottom-end" arrow>
            <span className='question_icon'>
              <BsQuestionCircleFill />
            </span>
          </Tooltip>
        }
        <BiChevronRight className={`fold_button ${open ? 'fold_open' : ''}`} onClick={onClick} />
      </h2>

      <div className={`collapse ${open ? 'visible' : 'hidden'} ${props.bottom ? 's_bottom' : ''}`}>
        {children}
      </div>
    </SField>
  );
};


const SField = styled.div`
  margin-inline: 2%;
  &.small{
    margin-inline: 0;
    span{
      font-size: 1rem;
      font-weight: bold;
      color: #222;
    }
    .field_head{
      border-bottom: 1px solid;
    }
  }
  h2{
    display: flex;
    justify-content: space-between;
    user-select: none;
    span {
      font-size: 1.5rem;
      font-weight: 500;
      margin: 0.2rem 0.2rem;
    }
  }
  .field_head{
    display: flex;
    align-items: center;
    color: #000;
    border-bottom: 2px solid #000;
    .fold_button{
      box-sizing: content-box;
      padding: 5px;
      font-size:25px;
      transition:.1s;
      cursor: pointer;
      &:hover{
        color:#aaa;
      }
      &.fold_open{
        transform:rotate(90deg);
      }
    }
  }
  .question_icon {
    display: flex;
    margin-right: 20px;
    margin-left: auto;
    font-size: 15px;
    color: #111;
    cursor: pointer;
  }

  .collapse {
    transition: height 300ms;
    overflow: hidden;
  }
  .visible {
    height: auto;
    &.s_bottom {
      border-bottom: 2px solid #111;
    }
  }
 
  .hidden {
    height: 0;
  }
`;