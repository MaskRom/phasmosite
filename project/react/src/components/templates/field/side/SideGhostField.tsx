import React from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { GhostTable } from '../../table/GhostTable';
import { ghostTopAPIState } from '../../../../recoil/APIState';



export const SideGhostField: React.VFC = () => {
  const ghostTopAPI = useRecoilValueLoadable(ghostTopAPIState);
  return (
    <>
      <h2 className='side_h2 hd_re'>ゴースト一覧</h2>
      {ghostTopAPI.state === 'hasValue' && ghostTopAPI.contents.length ?
        <GhostTable ghost={ghostTopAPI.contents} center={false} /> :
      ''}
    </>
  );
};