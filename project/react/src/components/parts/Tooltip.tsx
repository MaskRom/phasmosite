import styled from 'styled-components';
import { useState } from 'react';
import React from "react";



type TTooltip = {
  children: React.ReactElement;
  text: string;
};


export const Tooltip = (props: TTooltip) => {

  const [show, setShow] = useState(false);

  const textWidth = props.text.length * 12 + 15;

  return (
    <STooltip textLen={textWidth}>
      <div
        className='t_child'
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {props.children}
      </div>
      {show &&
        <div className='t_text'>{props.text}</div>
      }

    </STooltip>
  );
};

const STooltip = styled.div<{ textLen: number }>`
  position: relative;
  .t_text {
    position: absolute;
    ${props => `min-width: ${props.textLen}px;`}

    font-size:12px;
    z-index: 10;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(100,100,100, 0.9);
    color: #fff;
    padding: 0.1em;
    border-radius: 5px;
  }
`;