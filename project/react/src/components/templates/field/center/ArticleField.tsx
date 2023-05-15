import { articleTopAPIState } from '../../../../recoil/APIState';
import { MoreButton } from '../../../parts/button/MoreButton';
import { ArticleTable } from '../../table/ArticleTable';
import { useRecoilValueLoadable } from 'recoil';
import React from 'react';



export const ArticleField = () => {

  const articleTopAPI = useRecoilValueLoadable(articleTopAPIState);

  return (
    <>
      {articleTopAPI.state === 'hasValue' && articleTopAPI.contents.length ?
        <ArticleTable articles={articleTopAPI.contents} /> :
        ''}
      <MoreButton link='article' />
    </>
  );
};
