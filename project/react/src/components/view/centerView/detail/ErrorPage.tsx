import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import styled from 'styled-components';
import React from 'react';


export const ErrorPage = () => {
  const navigation = useNavigate();

  return (
    <SNotFound>
      <div className='s_status'>666<span>Not Found</span></div>
      <p className='s_message'>
        お探しのページはゴーストの干渉により一時的にアクセスができない状況か、
        削除された可能性があります。タイプミスがないか再度ご確認ください。
      </p>
      <Button
        variant='outlined'
        onClick={() => { navigation('/') }}
      >
        トップページに戻る
      </Button>
    </SNotFound>
  );
}

const SNotFound = styled.div`
  text-align: center;
  margin-block: 20px;
  .s_status {
    font-size: 3rem;
    font-weight: bold;
    color: #444;
    span{
      margin-left: 10px;
      font-size: 1.8rem;
    }
  }
  .s_message{
    color:#333;
    margin-inline: 2rem;
    margin: 20px;
  }
  button{
    margin: 20px;
  }
`;