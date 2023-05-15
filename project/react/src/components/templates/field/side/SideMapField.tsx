import { mapTopAPIState } from '../../../../recoil/APIState';
// import { MapSlide } from '../../../parts/slideshow/MapSlide';
import { useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import React from 'react';



export const SideMapField = () => {
  const mapTopAPI = useRecoilValueLoadable(mapTopAPIState);
  return (
    <>
      {/* <h2 className='side_h2 hd_re'>マップ一覧</h2>
      {mapTopAPI.state === 'hasValue' && mapTopAPI.contents.length ?
        <MapSlide maps={mapTopAPI.contents} />
        : ''} */}

    </>
  );
};
