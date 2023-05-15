import { postTopAPIState } from '../../../../recoil/APIState';
import { MoreButton } from '../../../parts/button/MoreButton';
import { PostTable } from '../../table/PostTable';
import { useRecoilValueLoadable } from 'recoil';
import React from 'react';



export const PostField = () => {

  const postTopAPI = useRecoilValueLoadable(postTopAPIState);

  return (
    <>
      {postTopAPI.state === 'hasValue' && postTopAPI.contents.length ?
        <PostTable posts={postTopAPI.contents} />
        : ''}
      <MoreButton link='post'/>
    </>
  );
};
