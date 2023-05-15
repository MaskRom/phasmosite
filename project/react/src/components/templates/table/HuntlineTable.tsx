import { HuntlineItem } from '../../parts/item/HuntlineItem';
import styled from 'styled-components';
import React from 'react';



type THuntlineTable = {
  huntline: Array<{
    text: string,
    sanity: number
  }>
};

export const HuntlineTable = (props: THuntlineTable) => {
  return (
    <SHuntlineTable>
      {props.huntline.length &&
        props.huntline.map((item, index) => {
          return (
            <HuntlineItem
              key={index}
              text={item.text}
              sanity={item.sanity}
            />
          )
        })
      }
    </SHuntlineTable>
  );
};

const SHuntlineTable = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  list-style: none;
  
`;