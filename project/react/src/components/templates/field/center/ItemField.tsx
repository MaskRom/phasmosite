import { equipmentTopAPIState } from '../../../../recoil/APIState';
import { cursedItemTopAPIState } from '../../../../recoil/APIState';
import { ItemTable } from '../../table/ItemTable';
import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import React from 'react';
import { H3 } from '../../../parts/Headline';



export const ItemField = () => {

  const equipmentTopAPI = useRecoilValueLoadable(equipmentTopAPIState);
  const cursedItemTopAPI = useRecoilValueLoadable(cursedItemTopAPIState);

  return (
    <SItemField>
      {equipmentTopAPI.state === 'hasValue' && equipmentTopAPI.contents.length &&
        equipmentTopAPI.contents.map((item, index) => {
          return (
            <div key={index}>
              <H3 title={item.name} />
              <ItemTable center={true} url='wiki/equipment' item={item.item} />
            </div>
          )
        })}

      {cursedItemTopAPI.state === 'hasValue' && cursedItemTopAPI.contents.length &&
        <div>
          <H3
            title='呪いのアイテム'
            help='呪いのアイテムはアイテムごとに固定の出現箇所があり、
              ランダムで１つ出現します。(カスタム難易度で変更可能)'
          />
          <ItemTable center={true} url='wiki/curseditem' item={cursedItemTopAPI.contents} />
        </div>}
    </SItemField>
  );
};


const SItemField = styled.div`
  margin: 5px 0;
`;