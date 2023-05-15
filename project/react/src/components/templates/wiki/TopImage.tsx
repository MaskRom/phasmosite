import Rating from '@mui/material/Rating';
import styled from 'styled-components';
import React from 'react';



type TTopImage = {
  image2: string | null;
  name: string;
  name_en?: string;
  subtitle: string;
  updated_at: string;
  level?: number;
}

export const TopImage = (props: TTopImage) => {
  const { image2, name, name_en, subtitle, updated_at, level } = props;
  return (
    <STopImage image2={`${process.env.REACT_APP_BASE_PATH}${image2}`}>
      <div className='image_flame'></div>
      <p className='top_image_subtitle'>{subtitle}</p>
      <p className='top_image_date'>更新：{updated_at}</p>
      <div className='top_image_down'>
        <p className='top_image_name_en'>{name_en}</p>
        <h2 className='top_image_name hd_re'>{name}</h2>
        {level ?
          <div className='top_image_level'>
            <span>危険度:</span>
            <Rating readOnly precision={1} value={level} />
          </div>
          : ''}
      </div>
    </STopImage>
  );
};

const STopImage = styled.div<{ image2: string }>`
  width: 100%;
  height: 300px;
  background-image: url(${props => props.image2});
  background-size: cover;
  color: #fff;
  position: relative;
  .image_flame{
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, transparent 0% 0%, #000 100%);
  }
  .top_image_date{
    position: absolute;
    margin : 5px;
    bottom: 0;
    right: 0;
    color: #aaa;
  }
  .top_image_down{
    position: absolute;
    margin : 10px;
    bottom: 5px;
  }
  .top_image_subtitle{
    position: absolute;
    top: 0;
    padding: 10px;
    color: #aaa;
    font-size: 18px;
  }
  .top_image_name{
    font-weight: 600;
    
    font-size: clamp(1px, 30px, 30px);
  }
  .top_image_name_en{
    font-size: 16px;
    color: #aaa;
  }
  .top_image_level{
    span{
      font-size: 18px;
    }
    display: flex;
    align-items: center;
  }
  @media screen and (max-width: 550px) {
    &{
      height: 250px;
    .image_flame{
        height: 250px;
      }
    }
  }
`;