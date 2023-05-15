import { SThreeTable } from '../../../styled/SThreeTable';
import { TagItem } from '../../parts/item/TagItem';
import { Item } from '../../parts/item/Item';
import React from 'react';



type TItemTable = {
  center: boolean;
  url: string;
  item: {
    slug: string;
    name: string;
    image1: string | null;
  }[]
}

export const ItemTable = (props: TItemTable) => {
  return (
    <SThreeTable>
      {props.item.length ?
        props.item.map((item, index) => {
          return (
            <Item
              key={index}
              center={props.center}
              url={props.url}
              slug={item.slug}
              name={item.name}
              image1={item.image1}
            />
          )
        })
        : ''}
    </SThreeTable>
  );
}
