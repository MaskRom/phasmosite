import { GhostRoomTable } from "../table/GhostRoomTable";
import { H3 } from "../../parts/Headline";
import React from "react";



type TGhostRoomField = {
  room: Array<{
    index: number;
    name: string;
    name_en: string;
    image1: string;
  }>
}

export const GhostRoomField = (props: TGhostRoomField) => {
  return (
    <>
      <H3 title='ゴーストルームになりうる部屋' help='ゴーストはいずれかの部屋をゴーストルームとして選択し活動します。'/>
      {props.room.length ?
        <GhostRoomTable room={props.room} />
        : <p className="no_data_text">情報がありません</p>}
    </>
  )
}