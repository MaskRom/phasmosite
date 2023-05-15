import styled from "styled-components";
import React from "react";
import { H3 } from "../../parts/Headline";



type TPriceSellUpDownField = {
  price: number;
  price_s: number;
  limit_up: number;
  limit_low: number;
}

export const PriceSellUpDownField = (props: TPriceSellUpDownField) => {
  return (
    <SPriceSellUpDownField>
      <H3 title='価格と持ち込み詳細' />
        <table>
          <thead>
            <tr>
              <td>価格</td>
              <td>売価</td>
              <td>持ち込み上限</td>
              <td>持ち込み下限</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>＄{props.price}</td>
              <td>＄{props.price_s}</td>
              <td>{props.limit_up}個</td>
              <td>{props.limit_low}個</td>
            </tr>
          </tbody>
        </table>
    </SPriceSellUpDownField>
  );
}

const SPriceSellUpDownField = styled.div`
  td {
    width: 25%;
  }
`;