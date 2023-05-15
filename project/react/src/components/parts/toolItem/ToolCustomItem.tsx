import { toolDifficultyValueState } from '../../../recoil/toolDifficultyState';
import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import React from 'react';




export const ToolCustomItem = () => {

  const toolDifficultyValue = useRecoilValueLoadable(toolDifficultyValueState);

  const [magnification, setMagnification] = useState<number>(1);

  useEffect(() => {
    let newMagn = 1;
    for (let i of Object.keys(toolDifficultyValue.contents)) {
      newMagn = toolDifficultyValue.contents[i].magn * newMagn;
    }
    setMagnification(newMagn);
  }, [toolDifficultyValue])

  return (
    <SToolCustomItem>
      <div className='s_magn'>報酬 x{magnification}</div>
    </SToolCustomItem>
  );
}


const SToolCustomItem = styled.div`
  position: fixed;
  bottom: -5px;
  width: 100%;
  max-width: var(--main-width);
  display: flex;
  justify-content: center;
  .s_magn{
    padding: 5px;
    color: #222;
    font-weight: bold;
    font-size: 1.6rem;
    width: 100%;
    border: #aaa 0px solid;
    background-color: rgba(200, 200, 200, 0.75);
    backdrop-filter: blur(12px);
    border-radius: 2px;
    text-align: center;
  }
`;