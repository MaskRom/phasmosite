import { SpeedItem } from '../../parts/item/SpeedItem';
import styled from 'styled-components';
import React from 'react';


type TGhostByspeedTable = {
  speed: Array<{
    situation: string;
    value: number;
  }>;
}

export const GhostBySpeedTable = (props: TGhostByspeedTable) => {
  return (
    <table>
      <thead>
        <tr>
          <td>状況</td>
          <td>速度(m/s)</td>
        </tr>
      </thead>
      {props.speed.length &&
        props.speed.map((item, index) => {
          return (
            <SpeedItem
              key={index}
              situation={item.situation}
              value={item.value}
            />
          )
        })
      }
    </table>
  );
}