import { Link } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';



type TMoreButton = {
  link: string;
}

export const MoreButton = (props: TMoreButton) => {
  return (
    <SMoreButton>
      <Link to={props.link}>
        もっと見る
      </Link>
    </SMoreButton>
  );
};


const SMoreButton = styled.div`
  a {
    display: block;
    text-align: center;
    color: var(--active-fg);
    padding: 5px;
    font-size: 0.9rem;
    text-decoration: none;
    transition: 0.2s;
    &:hover {
      background-color: rgba(0,0,0,0.05);
    }
  }
`;