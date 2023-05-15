import { toolIdentificationGhostValue, toolIdentificationMenu } from '../../../recoil/toolIdentificationState';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ghostTopAPIState } from '../../../recoil/APIState';
import React from 'react';



// ゴースト特定ツールの確率の高いゴースト
export const ToolHightProbabilityGhost = () => {

  const ghostTopAPI = useRecoilValueLoadable(ghostTopAPIState);
  const identificationGhostValue = useRecoilValue(toolIdentificationGhostValue);
  const [mostGhost, setMostGhost] = useState<string>('');

  let ghostObj: any = {};

  if (ghostTopAPI.state === 'hasValue') {
    ghostTopAPI.contents.forEach((element: any) => {
      ghostObj[element.slug] = element.name;
    });
  }


  useEffect(() => {
    let mostValue = 0;
    setMostGhost('');
    for (const i of Object.keys(identificationGhostValue)) {
      if (identificationGhostValue[i] > mostValue) {
        mostValue = identificationGhostValue[i];
        setMostGhost(i);
      }
    }

  }, [identificationGhostValue])


  return (
    <SToolHightProbabilityGhost>
      <span className='s_text'>可能性が最も高いゴースト:</span>
      <span className='s_ghost'>{mostGhost ? ghostObj[mostGhost] : '-'}</span>
    </SToolHightProbabilityGhost>
  );
}

const SToolHightProbabilityGhost = styled.div`
  padding-block-start: 5px;
  text-align: center;
  span{
    display: block;
    
  }
  .s_text {
    font-weight: bold;
    color: #333;
    font-size: 0.9rem;
  }
  .s_ghost {
    padding-block: 7px;
    margin: auto;
    border-radius: 4px;
    max-width: 200px;
    font-size: 1.2rem;
    background-color: #d8c176;
    background-color: #e9dcb5;
    box-shadow: inset 0px 0px 10px 0px rgba(43, 33, 0, 0.3);
  }
`;