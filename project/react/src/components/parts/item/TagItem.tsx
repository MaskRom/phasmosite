import { BiPurchaseTag } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import styled from 'styled-components';
import React from 'react';



type TTag = {
  name: string;
  remove? : any;
}

export const TagItem: React.FC<TTag> = (props) => {
  return (
    <STagItem onClick={props.remove}>
      {props.remove ?
        <MdCancel /> :
        <BiPurchaseTag />
      }
      <span>{props.name}</span>
    </STagItem>
  );
};


const STagItem = styled.span`
  display: inline-block;
  text-decoration: none;
  border: #999 solid 1px;
  border-radius: 5px;
  font-weight: 600;
  color: #333;
  padding:2px 9px;
  margin: 4px;
  cursor: pointer;
  svg{
    top: 2px;
    left: -2px;
    font-size: 1em;
    position: relative;
  }
  &:hover{
    color: var(--active-fg);
    border: var(--active-fg) solid 1px;
  }
`;