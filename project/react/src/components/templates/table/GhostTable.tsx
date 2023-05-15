import React from 'react';
import { TGhostTop } from '../../../types/TyAPI';
import { GhostItem } from '../../parts/item/GhostItem';
import { SThreeTable } from '../../../styled/SThreeTable';



type TGhostTable = {
  ghost: TGhostTop[];
  center: boolean;
};

export const GhostTable = (props: TGhostTable) => {
  return (
    <SThreeTable>
      {props.ghost.map((item: TGhostTop, index) => {
        return (
          <GhostItem
            key={index}
            slug={item.slug}
            name={item.name}
            level={item.level}
            center={props.center}
          />
        )
      })}
    </SThreeTable>
  );
};
