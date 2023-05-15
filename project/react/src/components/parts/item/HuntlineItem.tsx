import styled from 'styled-components';
import React from 'react';



type THuntlineItem = {
  text: string;
  sanity: number;
};

export const HuntlineItem = (props: THuntlineItem) => {
  return (
    <SHuntlineItem sanity={props.sanity}>
      <div className='graph'>
        <svg>
          <circle className="base" cx="75" cy="75" r="70"></circle>
          <circle className="line" cx="75" cy="75" r="70"></circle>
        </svg>
        <div className='sanity'>
          <span className='number'>{props.sanity}<span>%</span></span>
        </div>
      </div>

      <p className="text">{props.text}</p>
    </SHuntlineItem>
  );
};


const SHuntlineItem = styled.li<{ sanity: number }>`
  text-align: center;
  width: 175px;
  .graph{
    position: relative;
  }
  svg {
    width: 150px;
    height: 150px;
    transform: rotate(-90deg);
    circle {
      fill: none;
      stroke-width: 10;
      stroke: #f3f3f3;
      stroke-dasharray: 440;
      stroke-dashoffset: 0;
      stroke-linecap: round;
    }
    .line {
      animation: circleAnim 1s forwards;

      stroke-dashoffset: calc(440 - (440 * ${props => props.sanity}) / 100);
      ${({ sanity }) => sanity >= 60 ?
      'stroke: #ff2600;' : sanity >= 40 ?
      'stroke: #ffd900;' :
      'stroke: #00ff62;'
      }
    }
    @keyframes circleAnim {
      0% {
        stroke-dasharray: 0 440;
      }
      99.9%,
      to {
        stroke-dasharray: 440 440;
      }
    }
  }
  .sanity {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #111;
  }
  .number {
    font-size: 35px;
  }
  span {
    font-size: 22px;
  }
  .text {
    text-align: center;
    font-weight: bold;
    font-size: 15px;
    width: 100%;
  }


  
`;