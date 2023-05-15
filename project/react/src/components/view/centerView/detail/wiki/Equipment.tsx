import { EvidenceByGhostField } from '../../../../templates/wiki/EvidenceByGhostField';
import { styleByURLState } from '../../../../../recoil/styleByURLState';
import { Explanation } from '../../../../templates/wiki/Explanation';
import { TopImage } from '../../../../templates/wiki/TopImage';
import { Field } from '../../../../templates/field/Field';
import Style from '../../../../../types/TyStyle';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import React from 'react';
import { NowLoading } from '../../../../parts/skeleton/NowLoading';
import { PriceSellUpDownField } from '../../../../templates/wiki/PriceSellUpDownField';
import { EquipmentByEvidenceField } from '../../../../templates/wiki/EquipmentByEvidenceField';
import { MarkdownField } from '../../../../templates/field/center/MarkdownField';
import { api } from '../../../../../axios';
import { InfiniteField } from '../../../../templates/field/InfiniteField';
import { PostInfiniteField } from '../../../../templates/field/infinite/PostInfiniteField';
import { ItemField } from '../../../../templates/field/center/ItemField';
import { ErrorPage } from '../ErrorPage';
import { modalState } from '../../../../../recoil/modalState';



type TEquipment = {
  slug: string;
  tags: Array<string>;
  name: string;
  name_en: string;
  price: number;
  price_s: number;
  limit_up: number;
  limit_low: number;
  image1: string | null;
  image2: string | null;
  explanation: string | null;
  text: string | null;
  updated_at: string;
  version: string | null;
  evidence: Array<{
    slug: string;
    name: string;
    text: string | null;
  }>;
};


export const Equipment: React.FC = () => {

  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return ({
        title: '装備',
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
  const equipmentId = params.equipmentId;
  const [equipment, setEquipment] = React.useState<TEquipment | null | false>(null);
  const [modal, setModal] = useRecoilState(modalState);

  React.useEffect(() => {
    setEquipment(null);
    api.get(`/equipments/${equipmentId}`)
      .then(res => {
        setEquipment(res.data);
        setModal((modal) => {
          return (
            { ...modal, ...{ post: { ...modal.post, ...{ tags: res.data.tags } } } }
          )
        })
      }).catch(err => {
        setEquipment(false);
      });
  }, [equipmentId]);


  if (equipment) {
    return (
      <>
        <TopImage
          subtitle='装備'
          image2={equipment.image2}
          name={equipment.name}
          name_en={equipment.name_en}
          updated_at={equipment.updated_at}
        />
        <Field title='情報' fold={true}>
          <Explanation text={equipment.explanation} />
          <PriceSellUpDownField
            price={equipment.price}
            price_s={equipment.price_s}
            limit_up={equipment.limit_up}
            limit_low={equipment.limit_low}
          />
          <EquipmentByEvidenceField evidence={equipment.evidence} />
          <></>
        </Field>
        <Field title='詳細' fold={true}>
          <MarkdownField text={equipment.text} />
        </Field>
        {/* <InfiniteField title='投稿' sortNew={true} tags={equipment.tags} fold={true}>
          <PostInfiniteField />
        </InfiniteField> */}
        <Field title='その他のアイテム' fold={true}>
          <ItemField />
        </Field>
      </>
    );

  } else if (equipment === null) {
    return <NowLoading />

  } else {
    return <ErrorPage />
  }
}