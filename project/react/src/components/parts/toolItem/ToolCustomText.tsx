import { toolDifficultyValueState } from '../../../recoil/toolDifficultyState';
import { TextareaAutosize } from '@mui/material';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import React from 'react';


export const ToolCustomText = () => {


  const [
    toolDifficultyValue,
    setToolDifficultyValue] = useRecoilState(toolDifficultyValueState);
  

  
  const textonChange = (event: any) => {
    setToolDifficultyValue(() => {
      return (
        {...toolDifficultyValue, ...{text: event.target.value}}
      )
    })
  };

  return (
    <SToolCustomText>
      <TextareaAutosize
        value={toolDifficultyValue.text}
        onChange={textonChange}
        minRows={1}
        placeholder='カスタム難易度の説明を追加'
      />
    </SToolCustomText>
  )
}

const SToolCustomText = styled.div`
  textarea {
    padding: 6px 12px;
    margin: 5px 10px;
    font-size: 1.2rem;
    resize: none;
    width: calc(100% - 20px);
    height: auto;
    border-radius: 2px;
    background-color: #ddd;
    outline: none;
    border: none;
  }
`;