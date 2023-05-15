import { PostInfiniteField } from '../../../../templates/field/infinite/PostInfiniteField';
import { EvidenceByGhostField } from '../../../../templates/wiki/EvidenceByGhostField';
import { MarkdownField } from '../../../../templates/field/center/MarkdownField';
import { GhostField } from '../../../../templates/field/center/GhostField';
import { InfiniteField } from '../../../../templates/field/InfiniteField';
import { styleByURLState } from '../../../../../recoil/styleByURLState';
import { HuntlineField } from '../../../../templates/wiki/HuntlineField';
import { FeatureField } from '../../../../templates/wiki/FeatureField';
import { Explanation } from '../../../../templates/wiki/Explanation';
import { NowLoading } from '../../../../parts/skeleton/NowLoading';
import { SpeedField } from '../../../../templates/wiki/SpeedField';
import { TopImage } from '../../../../templates/wiki/TopImage';
import { modalState } from '../../../../../recoil/modalState';
import { Field } from '../../../../templates/field/Field';
import Style from '../../../../../types/TyStyle';
import { useParams } from 'react-router-dom';
import { api } from '../../../../../axios';
import { ErrorPage } from '../ErrorPage';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import React from 'react';



type TGhost = {
  slug: string;
  tags: Array<string>;
  name: string;
  name_en: string;
  level: number;
  acceleration_v: boolean;
  acceleration_d: boolean;
  image1: string | null;
  image2: string | null;
  explanation: string | null;
  text: string | null;
  updated_at: string;
  version: string | null;
  evidence: any;
  huntline: Array<{
    text: string;
    sanity: number;
  }>;
  speed: Array<{
    situation: string;
    value: number;
  }>;
  feature: Array<{
    feature: string;
  }>;
}

export const Ghost = () => {

  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return ({
        title: 'ゴースト',
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
  const ghostId = params.ghostId;
  const [ghost, setGhost] = React.useState<TGhost | null | false>(null);
  const [modal, setModal] = useRecoilState(modalState);

  useEffect(() => {
    setGhost(null);
    api.get(`/ghosts/${ghostId}`)
      .then(res => {
        setGhost(res.data);
        setModal((modal) => {
          return (
            { ...modal, ...{ post: { ...modal.post, ...{ tags: res.data.tags } } } }
          )
        })

      }).catch(err => {
        setGhost(false);
      })

  }, [ghostId]);


  if (ghost) {
    return (
      <>
        <TopImage
          subtitle='ゴーストの種類'
          image2={ghost.image2}
          level={ghost.level}
          name={ghost.name}
          name_en={ghost.name_en}
          updated_at={ghost.updated_at}
        />
        <Field title='情報' fold={true}>
          <Explanation text={ghost.explanation} />
          <EvidenceByGhostField evidence={ghost.evidence} />
          <HuntlineField huntline={ghost.huntline} />
          <SpeedField
            speed={ghost.speed}
            acceleration_v={ghost.acceleration_v}
            acceleration_d={ghost.acceleration_d}
          />
          <FeatureField feature={ghost.feature} />
        </Field>
        <Field title='詳細' fold={true}>
          <MarkdownField text={ghost.text} />
        </Field>
        {/* <InfiniteField title='投稿' sortNew={true} tags={ghost.tags} fold={true}>
          <PostInfiniteField />
        </InfiniteField> */}
        <Field title='その他のゴースト' fold={true}>
          <GhostField />
        </Field>
      </>
    );

  } else if (ghost === null) {
    return <NowLoading />

  } else {
    return <ErrorPage />
  }

};