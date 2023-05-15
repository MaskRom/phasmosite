import React from 'react';
import { AlertItem } from './AlertItem';
// Type
import { TAlert } from '../../../types/TyAPI';


export const AlertList = (props: any) => {

  return (
    <div>
      { props.alertList.map((item: TAlert, intex: number) => {
        return (
        <AlertItem
          key={ intex }
          severity={ item.severity }
          message={ item.message }
        />
        )
      })}
    </div>
  )
};
