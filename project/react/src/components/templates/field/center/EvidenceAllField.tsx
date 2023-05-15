import { evidenceTopAPIState } from '../../../../recoil/APIState';
import { EvidenceAllTable } from '../../table/EvidenceAllTable';
import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import React from 'react';



export const EvidenceAllField = () => {

  const evidenceTopAPI = useRecoilValueLoadable(evidenceTopAPIState);

  return (
    <SEvidenceField>
      {evidenceTopAPI.state === 'hasValue' && evidenceTopAPI.contents ?
        <EvidenceAllTable evidence={evidenceTopAPI.contents} />
        : ''}
    </SEvidenceField>
  );
};


const SEvidenceField = styled.div`
  margin: 5px 0;
`;