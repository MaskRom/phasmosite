import { EvidenceAllField } from '../../../templates/field/center/EvidenceAllField';
import { ArticleField } from '../../../templates/field/center/ArticleField';
import { GhostField } from '../../../templates/field/center/GhostField';
import { ItemField } from '../../../templates/field/center/ItemField';
import { styleByURLState } from '../../../../recoil/styleByURLState';
import { MapField } from '../../../templates/field/center/MapField';
import { Field } from '../../../templates/field/Field';
import Style from '../../../../types/TyStyle';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import React from 'react';



export const Wiki: React.FC = () => {

  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return({
        title: 'wiki',
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
      <Field title='ゴースト一覧' fold={true} help='ゲーム内に登場するゴーストの一覧です。'>
        <GhostField />
      </Field>

      <Field title='証拠一覧' fold={true} help='ゲーム内に登場する証拠の一覧です。'>
        <EvidenceAllField />
      </Field>

      <Field title='アイテム一覧' fold={true} help='ゲーム内に登場する装備・呪いのアイテムの一覧です。'>
        <ItemField />
      </Field>

      <Field title='マップ一覧' fold={true} help='ゲーム内に登場するマップの一覧です。'>
        <MapField />
      </Field>
    </>
  );
}