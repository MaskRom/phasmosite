import React from 'react';
import styled from 'styled-components';
// Recoil
import { useRecoilValueLoadable } from 'recoil';
import { ghostTopAPIState } from '../../../../recoil/APIState';
// templates
import { GhostTable } from '../../table/GhostTable';



export const GhostField: React.VFC = () => {
  const ghostTopAPI = useRecoilValueLoadable(ghostTopAPIState);
  return (
    <SGhostField>
      {ghostTopAPI.state === 'hasValue' && ghostTopAPI.contents.length ?
        <GhostTable ghost={ghostTopAPI.contents} center={true} /> :
        ''}
    </SGhostField>
  );
};


const SGhostField = styled.div`
  margin: 5px 0;
`;