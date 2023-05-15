import { styleByURLState } from '../../../../recoil/styleByURLState';
import Style from '../../../../types/TyStyle';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import React from 'react';
import { InfiniteField } from '../../../templates/field/InfiniteField';
import { PostInfiniteField } from '../../../templates/field/infinite/PostInfiniteField';
import { ArticleInfiniteField } from '../../../templates/field/infinite/ArticleInfiniteField';



export const Articlelist: React.VFC = () => {
  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return({
        title: '記事',
        isHeaderTop: true,
        nav: true,
        pageAlert: true,
        button: '',
        side: true,
        back: '/',
      })
    })
  }, []);

  return (
    <>
      {/* <InfiniteField title='記事' sortNew={true} tags={[]} fold={true}>
        <ArticleInfiniteField />
      </InfiniteField> */}
    </>
  );
}