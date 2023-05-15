import { ImCheckboxUnchecked } from "react-icons/im";
import { TEvidenceTop } from '../../../types/TyAPI';
import { ImCheckboxChecked } from "react-icons/im";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';



export const EvidenceItem = (props: TEvidenceTop) => {
  const { name, slug } = props;
  return (
    <SEvidenceItem>
      <Link to={`/wiki/evidence/${slug}`}>
        <ImCheckboxUnchecked className='evi_icon'/>
        <span>{name}</span>
      </Link>
    </SEvidenceItem>
  );
};


const SEvidenceItem = styled.span`
  width: 50%;
  a {
    display: flex;
    color: var(--active-fg);
    font-weight: bold;
    text-decoration: none;
    padding: 0.5rem;
    .evi_icon {
      color: #bbb;
      font-size: 20px;
      margin-right: 5px;
    }
    &:hover {
      background-color: #eee;
    }
  }
`;