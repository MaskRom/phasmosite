import { equipmentTopAPIState } from '../../../../recoil/APIState';
import { ItemTable } from '../../table/ItemTable';
import { useRecoilValueLoadable } from 'recoil';
import React from 'react';



export const SideItemField: React.VFC = () => {
  const equipmentTopAPI = useRecoilValueLoadable(equipmentTopAPIState);
  type TItem = {
    slug: string;
    name: string;
    image1: string | null;
  }
  let equipmentAll: Array<TItem> = [];
  if (equipmentTopAPI.state === 'hasValue' && equipmentTopAPI.contents.length) {
    for (let i of equipmentTopAPI.contents) {
      equipmentAll = [...equipmentAll, ...i.item];
    }
  }

  return (
    <>
      <h2 className='side_h2 hd_re'>装備一覧</h2>
      {equipmentTopAPI.state === 'hasValue' && equipmentTopAPI.contents.length ?
        <ItemTable
          center={false}
          url='wiki/equipment'
          item={equipmentAll}
        />
        : ''}
    </>
  );
};