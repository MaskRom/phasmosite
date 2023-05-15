import styled from 'styled-components';
import React from 'react';



export const Explanation = (props: { text: string | null }) => {
  return (
    <SExplanation>
      <blockquote>
        <p>{props.text ? props.text : '説明がありません。'}</p>
      </blockquote>
    </SExplanation>
  );
};


const SExplanation = styled.div`
  p{
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: #ddd;
    border: solid 2px #ccc;
  } 
`;