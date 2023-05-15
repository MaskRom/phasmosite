import { toolIdentificationGhostMagn, toolIdentificationGhostValue, toolIdentificationMenu } from '../../../recoil/toolIdentificationState';
import { IdentificationGhostItem } from '../../parts/item/IdentificationGhostItem';
import { ghostTopAPIState } from '../../../recoil/APIState';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { useEffect, useState } from 'react';
import { MdSort } from 'react-icons/md';
import styled from 'styled-components';
import React from 'react';



export const IdentificationGhostTable = () => {

  const identificationGhostMagn = useRecoilValueLoadable(toolIdentificationGhostMagn);
  const ghostTopAPI = useRecoilValueLoadable(ghostTopAPIState);
  const [identificationMenu, setIdentificationMenu] = useRecoilState(
    toolIdentificationMenu);


  let ghostObj: any = {};

  if (ghostTopAPI.state !== 'hasValue') return null;
  else {
    ghostTopAPI.contents.forEach((element) => {
      ghostObj[element.slug] = element.name;
    });
  }

  const onClickSort = () => {
    setIdentificationMenu({
      ...identificationMenu, ...{ sort: !identificationMenu.sort }
    });
  };


  return (
    <SIdentificationGhostTable>
      {identificationGhostMagn.state === 'hasValue' &&
        identificationGhostMagn.contents.map((item, index) => {
          return (
            <IdentificationGhostItem
              key={index}
              slug={item.slug}
              name={ghostObj[item.slug]}
            />
          )
        })
      }
    </SIdentificationGhostTable>
  );
}

const SIdentificationGhostTable = styled.div`
  max-width: 375px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-block: 10px;
`;