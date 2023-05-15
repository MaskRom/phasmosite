import { PostInfiniteField } from '../../../templates/field/infinite/PostInfiniteField';
import { TagTopField } from '../../../templates/field/center/TagTopField';
import { InfiniteField } from '../../../templates/field/InfiniteField';
import { styleByURLState } from '../../../../recoil/styleByURLState';
import { Field } from '../../../templates/field/Field';
import Style from '../../../../types/TyStyle';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import React from 'react';



export const Postlist = () => {

  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return({
        title: '投稿',
        isHeaderTop: true,
        nav: true,
        pageAlert: true,
        button: 'post',
        side: true,
        back: '/',
      })
    })
  }, []);

  return (
    <>
      <Field title='人気のタグ' fold={true}>
        <TagTopField />
      </Field>
      {/* <InfiniteField title='投稿' sortNew={true} tags={[]} fold={true}>
        <PostInfiniteField />
      </InfiniteField> */}
    </>
  );
}