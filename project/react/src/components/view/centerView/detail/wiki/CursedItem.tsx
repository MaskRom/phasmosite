import { styleByURLState } from '../../../../../recoil/styleByURLState';
import { Explanation } from '../../../../templates/wiki/Explanation';
import { NowLoading } from '../../../../parts/skeleton/NowLoading';
import { TopImage } from '../../../../templates/wiki/TopImage';
import { Field } from '../../../../templates/field/Field';
import Style from '../../../../../types/TyStyle';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import React from 'react';
import { api } from '../../../../../axios';
import { InfiniteField } from '../../../../templates/field/InfiniteField';
import { PostInfiniteField } from '../../../../templates/field/infinite/PostInfiniteField';
import { MarkdownField } from '../../../../templates/field/center/MarkdownField';
import { ItemField } from '../../../../templates/field/center/ItemField';
import { ErrorPage } from '../ErrorPage';
import { modalState } from '../../../../../recoil/modalState';



type TCursedItem = {
  slug: string;
  tags: Array<string>;
  name: string;
  name_en: string;
  image1: string | null;
  image2: string | null;
  explanation: string | null,
  text: string | null;
  updated_at: string;
  version: string | null;
};

export const CursedItem: React.FC = () => {

  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return ({
        title: '呪いのアイテム',
        isHeaderTop: false,
        nav: true,
        pageAlert: true,
        button: 'post',
        side: true,
        back: '/wiki',
      })
    })
  }, []);

  const params = useParams();
  const curseditemId = params.curseditemId;
  const [cursedItem, setCursedItem] = React.useState<TCursedItem | null | false>(null);
  const [modal, setModal] = useRecoilState(modalState);

  React.useEffect(() => {
    setCursedItem(null);
    api.get(`/curseditems/${curseditemId}`)
      .then(res => {
        setCursedItem(res.data);
        setModal((modal) => {
          return (
            { ...modal, ...{ post: { ...modal.post, ...{ tags: res.data.tags } } } }
          )
        })
      }).catch(err => {
        setCursedItem(false);
      });
  }, [curseditemId]);


  if (cursedItem) {
    return (
      <>
        <TopImage
          subtitle='呪いのアイテムの種類'
          image2={cursedItem.image2}
          name={cursedItem.name}
          name_en={cursedItem.name_en}
          updated_at={cursedItem.updated_at}
        />
        <Field title='情報' fold={true}>
          <Explanation text={cursedItem.explanation} />
        </Field>
        <Field title='詳細' fold={true}>
          <MarkdownField text={cursedItem.text} />
        </Field>
        {/* <InfiniteField title='投稿' sortNew={true} tags={cursedItem.tags} fold={true}>
          <PostInfiniteField />
        </InfiniteField> */}
        <Field title='その他のアイテム' fold={true}>
          <ItemField />
        </Field>
      </>
    );

  } else if (cursedItem === null) {
    return <NowLoading />

  } else {
    return <ErrorPage />
  }
};