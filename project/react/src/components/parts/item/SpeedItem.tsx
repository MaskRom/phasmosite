import styled from 'styled-components';
import React from 'react';



type TSpeedItem = {
  situation: string;
  value: number;
};

export const SpeedItem = (props: TSpeedItem) => {
  const { situation, value } = props;
  return (
    <SSpeedItem>
      <tr>
        <td className='s_situation'>{situation}</td>
        <td>{value}</td>
      </tr>
    </SSpeedItem>
  );
}

const SSpeedItem = styled.tbody`
    .s_situation {
      width: 75%;
      text-align: left;
    }
`;