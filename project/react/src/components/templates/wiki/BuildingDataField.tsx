import styled from 'styled-components';
import React from 'react';
import { H3 } from '../../parts/Headline';



type TBuildingDataField = {
  mapsize: string,
  number: number,
  building: string,
  ghostroom_sum: number,
  floor: number;
}

export const BuildingDataField = (props: TBuildingDataField) => {
  return (
    <SBuildingDataField>
      <H3 title='建物の情報' />
      <table>
        <thead>
          <tr>
            <td>建物</td>
            <td>サイズ</td>
            <td>推奨人数</td>
            <td>階数</td>
            <td>部屋数</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.building? props.building: '-'}</td>
            <td>{props.mapsize? props.mapsize: '-'}</td>
            <td>{props.number ? props.number + '人' : '-'}</td>
            <td>{props.floor? props.floor: '-'}</td>
            <td>{props.ghostroom_sum? props.ghostroom_sum: '-'}</td>
          </tr>
        </tbody>
      </table>
    </SBuildingDataField>
  );
}

const SBuildingDataField = styled.div`
  td {
    width: calc(100%/5);
  }
`;