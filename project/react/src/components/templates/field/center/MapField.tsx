import { mapTopAPIState } from '../../../../recoil/APIState';
import { MapTable } from '../../table/MapTable';
import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import React from 'react';



export const MapField = () => {

  const mapTopAPI = useRecoilValueLoadable(mapTopAPIState);

  return (
    <SMapField>
      {mapTopAPI.state === 'hasValue' && mapTopAPI.contents.length ?
        <MapTable maps={mapTopAPI.contents} />
        : ''}
    </SMapField>
  );
};


const SMapField = styled.div`
  margin: 5px 0;
`;