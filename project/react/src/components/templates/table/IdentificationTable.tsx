import { IdentificationItem } from '../../parts/item/IdentificationItem';
import styled from 'styled-components';
import React from 'react';



type TIdentificationTable = {
  item: Array<{
    id: string;
    text: string;
    help: string;
  }>
}

export const IdentificationTable = (props: TIdentificationTable) => {
  return (
    <SIdentificationTable>
      {props.item.map((item, index) => {
        return (
          <IdentificationItem
            key={index}
            id={item.id}
            text={item.text}
            help={item.help}
          />
        )
      })}
    </SIdentificationTable>
  )
}

const SIdentificationTable = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;