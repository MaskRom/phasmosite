import { MarkdownField } from '../../../../templates/field/center/MarkdownField';
import { FloorByField } from '../../../../templates/wiki/FloorByField';
import { GhostRoomField } from '../../../../templates/wiki/GhostRoomField';
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
import { BuildingDataField } from '../../../../templates/wiki/BuildingDataField';
import { api } from '../../../../../axios';
import { InfiniteField } from '../../../../templates/field/InfiniteField';
import { PostInfiniteField } from '../../../../templates/field/infinite/PostInfiniteField';
import { MapField } from '../../../../templates/field/center/MapField';
import { ErrorPage } from '../ErrorPage';
import { modalState } from '../../../../../recoil/modalState';



type TMap = {
  slug: string;
  tags: Array<string>;
  name: string;
  name_en: string;
  mapsize: string,
  number: number,
  building: string,
  ghostroom_sum: number,
  floor: number;
  image1: string | null;
  image2: string | null;
  explanation: string | null,
  text: string | null;
  updated_at: string;
  version: string | null;
  floorBy: Array<{
    name: string;
    image: string;
  }>;
  room: Array<{
    index: number;
    name: string;
    name_en: string;
    image1: string;
  }>
}

export const Map = () => {

  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return ({
        title: 'マップ',
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
  const mapId = params.mapId;
  const [map, setMap] = React.useState<TMap | null | false>(null);
  const [modal, setModal] = useRecoilState(modalState);

  React.useEffect(() => {
    setMap(null);
    api.get(`/maps/${mapId}`)
      .then(res => {
        setMap(res.data);
        setModal((modal) => {
          return (
            { ...modal, ...{ post: { ...modal.post, ...{ tags: res.data.tags } } } }
          )
        })
      }).catch(err => {
        setMap(false);
      });
  }, [mapId]);


  if (map) {
    return (
      <>
        <TopImage
          subtitle='マップの種類'
          image2={map.image2}
          name={map.name}
          name_en={map.name_en}
          updated_at={map.updated_at}
        />
        <Field title='情報' fold={true}>
          <Explanation text={map.explanation} />
          <BuildingDataField
            mapsize={map.mapsize}
            number={map.number}
            building={map.building}
            ghostroom_sum={map.ghostroom_sum}
            floor={map.floor}
          />
          <FloorByField
            floorBy={map.floorBy}
          />
          <GhostRoomField
            room={map.room}
          />
        </Field>
        <Field title='詳細' fold={true}>
          <MarkdownField text={map.text} />
        </Field>
        {/* <InfiniteField title='投稿' sortNew={true} tags={map.tags} fold={true}>
          <PostInfiniteField />
        </InfiniteField> */}
        <Field title='その他のマップ' fold={true}>
          <MapField />
        </Field>
      </>
    );

  } else if (map === null) {
    return <NowLoading />

  } else {
    return <ErrorPage />
  }
}