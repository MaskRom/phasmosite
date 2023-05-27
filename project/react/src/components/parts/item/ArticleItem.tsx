import { TagTable } from "../../templates/table/TagTable";
import { HiOutlineBookmark } from "react-icons/hi2";
import { ThreeButton } from '../button/ThreeButton';
import { TArticleTop } from "../../../types/TyAPI";
import IconButton from '@mui/material/IconButton';
import { HiBookmark } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from "react";
import React from 'react';
import { api } from '../../../axios';
import { numberFormat } from '../../../function/numberFormat';




export const ArticleItem = (props: TArticleTop) => {

  const [checkBookmark, setCheckBookmark] = useState(props.favorited);
  const favoOnClick = () => {
    api.get(`/favo`, {
      params: {
        target: 'A',
        uuid: props.slug,
      }
    })
      .then((res) => {
        setCheckBookmark(!checkBookmark);
      }).catch((err) => {
        
      });
  };

  return (
    <SArticleItem checkBookmark={checkBookmark}>
      <Link to={`/article/${props.slug}`} className='article_link'>
        <div>
          <img src={props.image1 ? props.image1 : ''} alt='' />
        </div>
        <div>
          <p className='article_title'>{props.title}</p>
          <p className='article_subtitle'>{props.subtitle}</p>
          <TagTable tags={props.tags} />
          <div>
            <span className='article_detail'>更新日:{props.created_at}</span>
            <span className='article_detail'>@{props.user}</span>
          </div>
        </div>
      </Link>
      <div className='article_side'>
        <ThreeButton />
        <div className='article_bookmark' onClick={favoOnClick}>
          <IconButton>
            {checkBookmark ? <HiBookmark /> : <HiOutlineBookmark />}
          </IconButton>
          <span>{numberFormat(props.favoriteSum, checkBookmark, props.favorited)}</span>
        </div>
      </div>

    </SArticleItem>
  );
};


const SArticleItem = styled.div<{ checkBookmark: boolean }>`
  position: relative;
  text-align: left;
  display: flex;
  justify-content: space-between;
  border-bottom:#ddd solid 1px;
  transition: .2s;
  &:hover{
    background-color: rgba(0,0,0,0.05);
  }
  .article_link{
    width: 100%;
    text-decoration:none;
    display: flex;
    cursor: pointer;
    img{
      margin :5px;
      width: 52px;
      height:52px;
      object-fit: cover;
      border-radius: 10%;
    }
    .article_title{
      margin: 2px 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--active-fg);
    }
    .article_subtitle{
      font-size: 13px;
      color: var(--deactive-fg);
    }
    .article_detail{
      color: #777;
      font-size: 13px;
    }
  }
  .article_side{
    text-align: right;
    .article_bookmark{
      text-align: center;
      color: #777;
      border-radius: 5px;
      cursor: pointer;
      button {
        font-size: 19px;
      }
      ${({ checkBookmark }) => checkBookmark ?
    'span, button{color: darkorange;}' : ''}
      &:hover {
        button {
          color: darkorange;
        }
        span {
          color: darkorange;
        }
      }
    }
  }
`; 