import { tagsTopAPIState } from '../../../../recoil/APIState';
import { useRecoilValueLoadable } from 'recoil';
import { TagTable } from '../../table/TagTable';
import styled from 'styled-components';
import React from 'react';



export const TagTopField: React.FC = () => {
  const tagsTopAPI = useRecoilValueLoadable(tagsTopAPIState);
  return (
    <STagTopField>
      {tagsTopAPI.state === 'hasValue' && tagsTopAPI.contents.length ?
        <TagTable tags={tagsTopAPI.contents} /> : ''}
    </STagTopField>
  );
};


const STagTopField = styled.div`
  margin: 5px 0;
`;