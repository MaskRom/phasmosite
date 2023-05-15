import React from "react";
import { GhostRoomItem } from "../../parts/item/GhostRoomItem";



type TGhostRoomTable = {
  room: Array<{
    index: number;
    name: string;
    name_en: string;
    image1: string;
  }>
}

export const GhostRoomTable = (props: TGhostRoomTable) => {
  return (
    <table border={1}>
      <thead>
        <tr>
          <td>番号</td>
          <td>名前</td>
          <td>写真</td>
        </tr>
      </thead>
      <tbody>
        {props.room.map((item, index) => {
          return (
            <GhostRoomItem
              key={index}
              index={item.index}
              name={item.name}
              name_en={item.name_en}
              image1={item.image1}
            />
          )
        })}
      </tbody>
    </table>
  )
}