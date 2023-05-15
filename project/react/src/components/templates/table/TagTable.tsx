import React from 'react';
import { TagItem } from '../../parts/item/TagItem';



type TTagTable = {
  tags: Array<string>;
}

export const TagTable = (props: TTagTable) => {
  return (
    <>
      {props.tags ?
        props.tags.map((item, index) => {
          return <TagItem name={item} key={index} />
        }) : ''}
    </>
  );
}
