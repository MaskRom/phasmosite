import { SThreeTable } from '../../../styled/SThreeTable';
import { TagItem } from '../../parts/item/TagItem';
import { Item } from '../../parts/item/Item';
import React from 'react';



type TToolPresetTable = {
  center: boolean;
  url: string;
  item: {
    params: string;
    name: string;
    image: string | null;
  }[]
}

export const ToolPresetTable = (props: TToolPresetTable) => {
  return (
    <SThreeTable>
      {props.item.length ?
        props.item.map((item, index) => {
          return (
            <Item
              key={index}
              center={props.center}
              url={props.url}
              slug={item.params}
              name={item.name}
              image1={item.image}
            />
          )
        })
        : ''}
    </SThreeTable>
  );
}
