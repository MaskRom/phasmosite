import styled from "styled-components";
import React from 'react';



export const SubTitle = (props: { title: string }) => {

  return (
    <SSubTitle>
      <h2 className='hd_re'>{props.title}</h2>
    </SSubTitle>
  );
}


const SSubTitle = styled.div`
  margin: auto 10px;
  h2{
    color: #eee;
    font-weight: 500;
  }
`;