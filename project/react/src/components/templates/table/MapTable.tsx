import { MapItem } from '../../parts/item/MapItem';
import { TMapTop } from '../../../types/TyAPI';
import styled from 'styled-components';
import React from 'react';



type TMapTable = {
  maps: Array<TMapTop>;
}

export const MapTable = (props: TMapTable) => {
  return (
    <table border={1}>
      <thead>
        <tr>
          <td>写真</td>
          <td>名前</td>
          <td>サイズ</td>
        </tr>
      </thead>
      <tbody>
        {props.maps.map((item, index) => {
          return (
            <MapItem
              key={index}
              slug={item.slug}
              name={item.name}
              name_en={item.name_en}
              mapsize={item.mapsize}
              image1={item.image1}
            />
          )
        })}
      </tbody>
    </table>
  );
}