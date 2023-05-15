import { GhostByEvidenceField } from '../../../../templates/wiki/GhostByEvidenceField';
import { IdentifiableField } from '../../../../templates/wiki/IdentifiableField';
import { MarkdownField } from '../../../../templates/field/center/MarkdownField';
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
import { EvidenceAllField } from '../../../../templates/field/center/EvidenceAllField';
import { ErrorPage } from '../ErrorPage';
import { modalState } from '../../../../../recoil/modalState';



type TEvidence = {
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
  identifiable: Array<{
    slug: string;
    name: string;
    image1: string | null;
    text: string | null;
  }>,
  ghost: Array<{
    slug: string;
    name: string;
    level: number;
  }>
};

export const Evidence: React.FC = () => {

  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return ({
        title: '証拠',
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
  const evidenceId = params.evidenceId;
  const [evidence, setEvidence] = React.useState<TEvidence | null | false>(null);
  const [modal, setModal] = useRecoilState(modalState);

  React.useEffect(() => {
    setEvidence(null);
    api.get(`/evidence/${evidenceId}`)
      .then(res => {
        setEvidence(res.data);
        setModal((modal) => {
          return (
            { ...modal, ...{ post: { ...modal.post, ...{ tags: res.data.tags } } } }
          )
        })
      }).catch(err => {
        setEvidence(false);
      });
  }, [evidenceId]);


  if (evidence) {
    return (
      <>
        <TopImage
          subtitle='証拠の種類'
          image2={evidence.image2}
          name={evidence.name}
          name_en={evidence.name_en}
          updated_at={evidence.updated_at}
        />
        <Field title='情報' fold={true}>
          <Explanation text={evidence.explanation} />
          <IdentifiableField identifiable={evidence.identifiable} />
          <GhostByEvidenceField ghost={evidence.ghost} />
        </Field>
        <Field title='詳細' fold={true}>
          <MarkdownField text={evidence.text} />
        </Field>
        {/* <InfiniteField title='投稿' sortNew={true} tags={evidence.tags} fold={true}>
          <PostInfiniteField />
        </InfiniteField> */}
        <Field title='その他の証拠' fold={true}>
          <EvidenceAllField />
        </Field>
      </>
    );

  } else if (evidence === null) {
    return <NowLoading />

  } else {
    return <ErrorPage />
  }
};