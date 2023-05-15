import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { toolDifficultyValueState } from '../../../recoil/toolDifficultyState';
import { copyTextToClipboard } from '../../../function/copyTextToClipboard';
import { snackbarState } from '../../../function/snackbar';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { BiCopy } from 'react-icons/bi';
import { Tooltip } from '@mui/material';
import styled from 'styled-components';
import React from 'react';




export const ToolCustomURL = () => {
  // Snackbar
  const snack = useRecoilValue(snackbarState);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const uri = new URL(window.location.href);
  // toolValue
  const toolDifficultyValue = useRecoilValue(toolDifficultyValueState);

  const buttonOnClick = () => {
    let urlpalams: string = `${uri.protocol}//${uri.host}/tool/difficulty/?`;

    for (let i of Object.keys(toolDifficultyValue)) {
      if (i === 'text') {
        urlpalams += `${i}=${toolDifficultyValue['text'] ? toolDifficultyValue['text'] : ''}&`
      } else {
        urlpalams += `${i}=${toolDifficultyValue[i].now}&`
      }
    }

    copyTextToClipboard(urlpalams)
    setSnackbar(() => {
      return ({ ...snackbar, ...{ massage: '現在の難易度のURLをコピーしました！', } })
    })
    snack.clickfunc();
  }

  return (
    <SToolCustomURL>
      <Tooltip
        title='みんなに共有しよう！'
        placement='top'
        arrow
        disableInteractive
      >
        <Button
          variant="contained"
          endIcon={<BiCopy />}
          onClick={buttonOnClick}
        >
          現在の難易度のURLをコピー
        </Button>
      </Tooltip>
    </SToolCustomURL>
  );
}

const SToolCustomURL = styled.div`
  margin: 10px;
  text-align: center;
`;