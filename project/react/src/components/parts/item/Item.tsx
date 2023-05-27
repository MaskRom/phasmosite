import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import styled from 'styled-components';
import React from 'react';



type TItem = {
  center: boolean;
  url: string;
  slug: string;
  name: string;
  image1: string | null;
}

export const Item = (props: TItem) => {
  const { center, url, slug, name, image1 } = props;
  return (
    <SItem center={center}>
      <Tooltip title={name} disableInteractive>
        <Link to={`/${url}/${slug}`}>
          <img src={image1 ?  image1 : ''} />
          <p>{name.length > 8 ? `${name.slice(0, 7)}…` : name}</p>
        </Link>
      </Tooltip>
    </SItem>
  );
};


const SItem = styled.span<{ center: boolean }>`
  margin: 1px;
  border-radius: 1px;
  ${({ center }) => center ?
    'border: 2px #bbb solid;' :
    'border: 2px #666 solid;'}
  a {
    display: block;
    text-decoration: none;
    padding: 1px;
    font-weight: 700;
    transition: 0.1s;
    ${({ center }) => center ?
    'color: rgb(30, 155, 240);' :
    'color: #aaa;'}
  }
  img {
    width: 32px;
    height: 32px;
    ${({ center }) => center ?
    'background-color: #ddd;' :
    'background-color: #222;'}
    padding: 1px;
    border-radius: 5px;
  }
  &:hover {
    border :2px rgb(30, 155, 240) solid;
    a {
      color: rgb(30, 155, 240);
    }
  }
`;