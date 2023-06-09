import { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
import { Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from 'recoil';
import CircularProgress from '@mui/material/CircularProgress';
import { tagsTopAPIState } from "../../../recoil/APIState";
import { slideshowAPIState } from "../../../recoil/APIState";
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import back from './back.png';
import React from "react";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// // import "swiper/css";





export const TopSlide: React.VFC = () => {
  const slideshowAPI = useRecoilValueLoadable(slideshowAPIState);

  return (
    <STopSlide>
      <img src={back} alt="背景" />
      {/* <Swiper
        className="main_slide"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        speed={1500}
        pagination={{ clickable: true }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
      >
        {slideshowAPI.contents && slideshowAPI.state === 'hasValue' ?
          slideshowAPI.contents.map((item: any, index: number) => {
            return (
              <SwiperSlide className="main_slide_item" key={index}>
                <Link to={item.link_to}>
                  <div className="slide_text">
                    <p className="slide_text_small">{item.title}</p>
                    <p className="slide_text_big">{item.text}</p>
                  </div>
                  <img src={item.background ? process.env.REACT_APP_BASE_PATH + item.background : ''} alt="background" />
                </Link>
              </SwiperSlide>
            )
          })
          :
          <div className="load_slide">
            <CircularProgress style={{ color: '#aaa' }} />
          </div>
        }
      </Swiper> */}
    </STopSlide>
  );
};


const STopSlide = styled.div`
  img {
    height: 300px;
    width: 100%;
    object-fit: cover;
  }
  transition: 0.5s;
  display: flex;
  align-items: center;
  margin: auto;
  height: 300px;
  @media screen and (max-width: 550px) {&{height: 250px;img{height: 250px;}}}
  &:hover{
    //background: linear-gradient(180deg, transparent 0 10%, #000 100%);
  }
  .main_slide{
    --swiper-navigation-size : 25px;
    --swiper-navigation-color: rgba(255, 255, 255, 0.3);
    --swiper-pagination-color: rgba(255, 255, 255, 0.8);
    .swiper-wrapper{
      position: relative;
      .main_slide_item{
        height: 300px;
        background-color: rgba(0,0,0,0.4);
        @media screen and (max-width: 550px) {&{height: 250px;img{height: 250px;}}}
      }
      .slide_text{
        position: absolute;
        bottom: 15px;
        left: 20px;
        .slide_text_small{
          font-size: 18px;
          color: #aaa;
        }
        .slide_text_big{
          font-weight: 900;
          font-size: 35px;
          color: #eee;
        }
      }
      img{
        width: 100%;
        height: 300px;
        object-fit: cover;
      }
    }
  }
`;