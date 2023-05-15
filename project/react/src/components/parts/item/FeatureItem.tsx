import { ImCheckboxUnchecked } from "react-icons/im";
import styled from "styled-components";
import React from "react";

type TFeatureItem = {
  feature: string;
}

export const FeatureItem = (props: TFeatureItem) => {
  return (
    <SFeatureItem>
      <ImCheckboxUnchecked className='f_icon'/>
      <span>{props.feature}</span>
    </SFeatureItem>
  );
}

const SFeatureItem = styled.li`
  display: flex;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
  padding: 0.5rem;
  .f_icon {
    color: #bbb;
    font-size: 20px;
    margin-right: 12px;
  }
  span {
    font-size: 15px;
    margin: 5px;
  }
`;