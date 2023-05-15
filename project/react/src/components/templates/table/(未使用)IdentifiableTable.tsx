import { Item } from "../../parts/item/Item";
import styled from "styled-components";
import React from "react";



type TIdentifiableTable = {
  identifiable: Array<{
    slug: string;
    name: string;
    image1: string | null;
    text: string | null;
  }>
}

export const IdentifiableTable = (props: TIdentifiableTable) => {
  return (
    <SIdentifiableTable>
      {props.identifiable.length &&
        props.identifiable.map((item, index) => {
          return (
            <div key={index}>
              <Item slug={item.slug} name={item.name} image1={item.image1} center={true} url='wiki/equipment' />
            </div>
          )
        })
      }
    </SIdentifiableTable>
  );
}

const SIdentifiableTable = styled.div`
`;