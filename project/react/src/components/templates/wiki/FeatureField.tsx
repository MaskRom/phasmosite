import { FeatureItem } from '../../parts/item/FeatureItem';
import React from 'react';
import { H3 } from '../../parts/Headline';



type TFeatureField = {
  feature: Array<{
    feature: string;
  }>;
}

export const FeatureField = (props: TFeatureField) => {
  if (!props.feature.length) return null;
  return (
    <>
      <H3 title='ゴーストの特徴' help='このゴースト固有の特徴'/>
      <ul>
        {props.feature.map((item, index) => {
          return <FeatureItem key={index} feature={item.feature} />
        })}
      </ul>
    </>
  );
}