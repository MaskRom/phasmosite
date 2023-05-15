import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import React from 'react';



export const NowLoading: React.FC = () => {
  return (
    <SNowLoading>
      <CircularProgress style={{ color: '#aaa' }} />
    </SNowLoading>
  );
}

const SNowLoading = styled.div`
  margin: 50px;
  width: auto;
  text-align: center;
`;
