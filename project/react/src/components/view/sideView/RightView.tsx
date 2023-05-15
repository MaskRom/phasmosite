import { SideItemField } from '../../templates/field/side/SideItemField';
import { Fooder } from '../../parts/Fooder';
import React from 'react';



export const RightView: React.VFC = () => {
  return (
      <>
        <SideItemField />
        <Fooder center={ false }/>
      </>
  );
};