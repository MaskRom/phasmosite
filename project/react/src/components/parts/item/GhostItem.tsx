import { TGhostTop } from '../../../types/TyAPI';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Tooltip } from '@mui/material';
import React from 'react';



export const GhostItem = (props: TGhostTop & { center: boolean }) => {
  const { slug, name, level, center } = props;
  return (
    <SGhostItem center={center}>
      <Tooltip title={name} disableInteractive>
        <Link to={`/wiki/ghost/${slug}`}>
          <p>{name.length > 8 ? `${name.slice(0, 7)}…` : name}</p>
          <Rating readOnly size="small" precision={1} defaultValue={level} />
        </Link>
      </Tooltip>
    </SGhostItem>
  );
};


const SGhostItem = styled.span<{ center: boolean }>`
  margin: 1px;
  border-radius: 1px;
  ${({ center }) => center ?
    'border: 2px #bbb solid;' :
    'border: 2px #666 solid;'}
  a{
    display: block;
    text-decoration: none;
    padding: 1px;
    font-weight: 700;
    transition: 0.1s;
    ${({ center }) => center ?
    'color: rgb(30, 155, 240);' :
    'color: #aaa;'}
  }
  &:hover{
    border :2px rgb(30, 155, 240) solid;
    a{
      color: rgb(30, 155, 240);
    }
  }
`;