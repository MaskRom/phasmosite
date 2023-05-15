import styled from "styled-components";
import React from "react";



type TGhostRoomItem = {
  index: number;
  name: string;
  name_en: string;
  image1: string;
}

export const GhostRoomItem = (props: TGhostRoomItem) => {
  return (
    <SGhostRoomItem>
      <td>
        {props.index}
      </td>
      <td className='g_center'>
        <p className='map_name'>{props.name}</p>
        <p className='map_name_en'>{props.name_en}</p>
      </td>
      <td>
        <img src={props.image1 ? process.env.REACT_APP_BASE_PATH + props.image1 : ''} alt='' />
      </td>
    </SGhostRoomItem>
  )
}

const SGhostRoomItem = styled.tr`
  text-align: center;
  margin: auto;
  color: var(--active-fg);
  font-weight: 600;
  .map_name_en{
    font-size: 0.75em;
  }
  .g_center{
    width: 75%;
  }
  img{
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 5px;
    background-color: #ddd;
  }
`