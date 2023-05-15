import { BsCheckLg } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import styled from 'styled-components';
import React from 'react';


type TAccelerationTable = {
  acceleration_v: boolean;
}
export const AccelerationTable = (props: TAccelerationTable) => {
  return (
    <SAccelerationTable>
      <tbody>
        <tr>
          <td className='a_left'>視認加速</td>
          <td>
            {props.acceleration_v ?
              <BsCheckLg className='check' /> :
              <BsXLg className='not_check' />}
          </td>
        </tr>
      </tbody>
    </SAccelerationTable>
  );
};

const SAccelerationTable = styled.table`
  td {
    padding: 8px;
    width: 50%;
  }
  .a_left{

    background: #ddd;
    font-weight: bold;
  }
  svg{
    font-size: 16px;

    &.check{
      color: #19bd03;
    }
    &.not_check{
      color: red;
    }
  }
`;