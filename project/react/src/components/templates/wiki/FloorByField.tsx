import styled from "styled-components";
import React from "react";
import { H3 } from "../../parts/Headline";



type TFloorByField = {
  floorBy: Array<{
    name: string;
    image: string;
  }>
}

export const FloorByField = (props: TFloorByField) => {
  return (
    <SFloorByField>
      <H3 title='階層別' />
      {props.floorBy.length ?
        props.floorBy.map((item, index) => {
          return (
            <div key={index}>
              <h4>{item.name}</h4>
              {item.image ?
                <img src={`https://beta-phasmosite-s3.s3.amazonaws.com/media/${item.image}`} alt={item.name} /> :
                <p className="no_data_text">情報がありません</p>
              }
            </div>
          )
        })
        : <p className="no_data_text">情報がありません</p>}
    </SFloorByField>
  )
}

const SFloorByField = styled.div`
  img {
    width: 100%;
    padding: 5px;
  }
`