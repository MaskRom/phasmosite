import { H3, H4 } from '../../parts/Headline';
import { AccelerationTable } from '../table/AccelerationTable';
import { GhostBySpeedTable } from '../table/GhostBySpeedTable';
import React from 'react';



type TSpeedField = {
  speed: Array<{
    situation: string;
    value: number;
  }>;
  acceleration_v: boolean;
  acceleration_d: boolean;
};

export const SpeedField = (props: TSpeedField) => {

  return (
    <>
      <H3
        title='ハント時の速度'
        help='視認加速がある場合、ゴーストはハント時にプレイヤーを視認している場合に加速します。'
      />
      {/* <H4 title='加速' help='視認加速がある場合、ゴーストはハント時にプレイヤーを視認している場合に加速します。'/> */}
      <AccelerationTable
        acceleration_v={props.acceleration_v}
      />
      {/* <H4 title='速度' help='このゴーストはハント時に以下の速度で移動します。'/> */}
      <GhostBySpeedTable speed={props.speed} />
    </>
  );
}