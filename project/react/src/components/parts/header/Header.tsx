import React from 'react';
import styled from "styled-components";
import { Title } from './parts/Title';
import { SubTitle } from './parts/SubTitle';
import { SearchBox } from './parts/SearchBox';
import { Account } from './parts/Account';
import { useRecoilValue } from 'recoil';
import { styleByURLState } from '../../../recoil/styleByURLState';


export const Header: React.VFC = () => {

  // Recoil styleByURL get
  const styleByURL = useRecoilValue(styleByURLState);
  return (
    <SHeader>
      <Title
        isHeaderTop={styleByURL.isHeaderTop}
        back={styleByURL.back}
      />
      {styleByURL.isHeaderTop ? <SearchBox /> : <SubTitle title={styleByURL.title} />}
      <Account />
    </SHeader>
  );
}


const SHeader = styled.header`
  z-index: 3;
  width: 100%;
  display: grid;
  position: fixed;
  height: var(--header-hight);
  background-color: var(--header-bg);
  grid-template-columns: minmax(50px, 1fr) minmax(0, 370px) minmax(65px, 1fr);
`;