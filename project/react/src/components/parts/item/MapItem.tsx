import { BiPurchaseTag } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';



type TMapItem = {
  slug: string;
  name: string;
  name_en: string;
  mapsize: string;
  image1: string | null;
}

export const MapItem = (props: TMapItem) => {

  const navigate = useNavigate();

  return (
    <SMapItem onClick={() => { navigate(`/wiki/map/${props.slug}`) }}>
      <td>
        <img src={props.image1 ? process.env.REACT_APP_BASE_PATH + props.image1 : ''} alt='' />
      </td>
      <td>
        <p className='map_name'>{props.name}</p>
        <p className='map_name_en'>{props.name_en}</p>
      </td>
      <td>
        {props.mapsize}
      </td>
    </SMapItem>
  );
};


const SMapItem = styled.tr`
  text-align: center;
  margin: auto;
  color: var(--active-fg);
  font-weight: 600;
  transition: .1s;
  cursor: pointer;
  &:hover{
    text-decoration:underline;
  }
  .map_name{
    
  }
  .map_name_en{
    font-size: 0.75em;
  }
  img{
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 5px;
    background-color: #ddd;
  }
`;