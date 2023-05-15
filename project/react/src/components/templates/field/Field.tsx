import { BsQuestionCircleFill } from 'react-icons/bs';
import { BiChevronRight } from 'react-icons/bi';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';
import { useState } from 'react'
import React from 'react';



type TFleld = {
  children: React.ReactNode;
  title: string;
  fold: boolean;
  help?: string;
}

export const Field: React.FC<TFleld> = (props) => {
  const { title, fold, children } = props;
  const [open, setOpen] = useState(fold);
  const onClick = () => setOpen((prev: boolean) => !prev);

  return (
    <SField>
      <h2 className='field_head hd_re'>
        <BiChevronRight className={`fold_button ${open ? 'fold_open' : ''}`} onClick={onClick} />
        <span>{title}</span>
        {props.help &&
          <Tooltip title={props.help} placement="bottom-end" arrow>
            <span className='question_icon'>
              <BsQuestionCircleFill />
            </span>
          </Tooltip>
        }
      </h2>

      <div className={`collapse ${open ? 'visible' : 'hidden'}`}>
        {children}
      </div>
    </SField>
  );
};


const SField = styled.div`
  h2{
    user-select: none;
    span {
      font-size: 16px;
      margin: 0.8rem 0.2rem;
    }
  }
  .field_head{
    display: flex;
    align-items: center;
    color: #eee;
    background-color: #222;
    border-bottom: 1px solid #555;
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
    color: #eee;
    font-size: 15px;
    cursor: pointer;
  }


  .collapse {
    transition: height 300ms;
    overflow: hidden;
  }
  .visible {
    height: auto;
  }
  .hidden {
    height: 0;
  }
`;