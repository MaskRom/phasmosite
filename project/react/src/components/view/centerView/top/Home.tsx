import { EvidenceAllField } from '../../../templates/field/center/EvidenceAllField';
import { ArticleField } from '../../../templates/field/center/ArticleField';
import { TagTopField } from '../../../templates/field/center/TagTopField';
import { GhostField } from '../../../templates/field/center/GhostField';
import { PostField } from '../../../templates/field/center/PostField';
import { ItemField } from '../../../templates/field/center/ItemField';
import { styleByURLState } from '../../../../recoil/styleByURLState';
import { MapField } from '../../../templates/field/center/MapField';
// import { TopSlide } from '../../../parts/slideshow/TopSlide';
import { Field } from '../../../templates/field/Field';
import Style from '../../../../types/TyStyle';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import React from 'react';



export const Home = () => {

  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return({
        title: 'ホーム',
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
      {/* <TopSlide /> */}
      <Field title='人気のタグ' fold={true}>
        <TagTopField />
      </Field>
      <Field title='ゴースト一覧' fold={true}>
        <GhostField />
      </Field>

      <Field title='証拠一覧' fold={true}>
        <EvidenceAllField />
      </Field>

      <Field title='アイテム一覧' fold={true}>
        <ItemField />
      </Field>

      <Field title='マップ一覧' fold={true}>
        <MapField />
      </Field>

      <Field title='記事' fold={true}>
        <ArticleField />
      </Field>

      <Field title='最近の投稿' fold={true}>
        <PostField />
      </Field>
    </>
  );
}