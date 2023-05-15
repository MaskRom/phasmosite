import { IdentificationItem } from '../../parts/item/IdentificationItem';
import { TEvidenceTop } from '../../../types/TyAPI';
import styled from 'styled-components';
import React from 'react';



type TIdentificationEvidenceTable = {
  item: Array<TEvidenceTop>
}

export const IdentificationEvidenceTable = (props: TIdentificationEvidenceTable) => {
  return (
    <SIdentificationEvidenceTable>
      {props.item.map((item, index) => {
        return (
          <IdentificationItem
            key={index}
            id={item.slug}
            text={item.name}
          />
        )
      })}
    </SIdentificationEvidenceTable>
  )
}

const SIdentificationEvidenceTable = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;
`;