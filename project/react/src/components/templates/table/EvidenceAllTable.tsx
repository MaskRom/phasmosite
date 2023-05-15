import React from 'react';
import styled from 'styled-components';
import { EvidenceItem } from '../../parts/item/EvidenceItem';
import { TEvidenceTop } from '../../../types/TyAPI';


type TEvidenceAllTable = {
  evidence: TEvidenceTop[]
}
export const EvidenceAllTable = (props: TEvidenceAllTable) => {
  return (
    <SEvidenceAllTable>
      {props.evidence.length ?
        props.evidence.map((item, index) => {
          return <EvidenceItem key={index} slug={item.slug} name={item.name} />
      }) : ''}
    </SEvidenceAllTable>
  );
};


const SEvidenceAllTable = styled.div`
  display: flex;
  flex-wrap :wrap;
`;