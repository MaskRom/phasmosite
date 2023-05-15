import { copyTextToClipboard } from '../../../function/copyTextToClipboard';
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { numberFormat } from '../../../function/numberFormat';
import { snackbarState } from '../../../function/snackbar';
import { TagTable } from '../../templates/table/TagTable';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../../../recoil/modalState';
import { TSnackbar } from '../../../function/snackbar';
import { ThreeButton } from '../button/ThreeButton';
import IconButton from '@mui/material/IconButton';
import { HiOutlineHeart } from "react-icons/hi2";
import { AiOutlineLink } from "react-icons/ai";
import { HiHeart } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../../../axios';
import { useState } from "react";
import React from 'react';


// used Tymodal
export type TPostItem = {
  slug: string;
  tags: Array<string>;
  commentSum?: number;
  favoriteSum: number;
  display: string | null;
  icon: string | null;
  text: string | null;
  image1: string | null;
  image2: string | null;
  image3: string | null;
  image4: string | null;
  created_at: string;
  user: string | null;
  edit: boolean;
  favorited: boolean;
  more: boolean;
  top?: boolean;
  comment?: boolean;
}

export const PostItem = (props: TPostItem) => {
  // Snackbar
  const snack = useRecoilValue(snackbarState);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [checkHeart, setCheckHeart] = useState<boolean>(props.favorited);
  const favoOnClick = () => {
    api.get(`/favo`, {
      params: {
        target: props.commentSum === undefined ? 'C' : 'P',
        uuid: props.slug,
      }
    })
      .then((res) => {
        if (res.data == '1') {
          setCheckHeart(true);
          setSnackbar((): TSnackbar => {
            return { ...snackbar, ...{ massage: 'いいねを押しました！' } }
          })
        } else {
          setCheckHeart(false);
          setSnackbar((): TSnackbar => {
            return { ...snackbar, ...{ massage: 'いいねを取り消しました！' } }
          })
        }
        snack.clickfunc();
      }).catch((err) => {
        setSnackbar((): TSnackbar => {
          return { ...snackbar, ...{ massage: 'エラーが発生しました。もう一度お試しください。' } }
        })
        snack.clickfunc();
      });
  };

  const copyOnclick = () => {
    copyTextToClipboard(`${process.env.REACT_APP_BASE_PATH}/post/${props.slug}`)
    setSnackbar((): TSnackbar => {
      return { ...snackbar, ...{ massage: 'リンクをコピーしました！' } }
    })
    snack.clickfunc();
  }

  // Modal
  const [modal, setModal] = useRecoilState(modalState);
  const replyOnclick = () => {
    setModal(() => {
      return (
        { ...modal, ...{ post: { ...modal.post, ...{ source: props } } } }
      )
    })
    modal.post.open(true);
  }

  return (
    <SPostItem checkHeart={checkHeart}>
      <div className='p_main'>
        <div className='p_left'>
          <img src={props.icon ? process.env.REACT_APP_BASE_PATH + props.icon: ''} alt='usericon' />
        </div>
        <div className='p_right'>
          <div className='p_head'>
            <div>
              <span className='p_font p_name'>{props.display}</span>
              <span className='p_font p_gray'>{props.user ? `@${props.user}` : ''}</span>
              <span className='p_font p_gray'>・{props.created_at}</span>
            </div>
          </div>
          <p className={`p_font ${props.top && 'p_big'}`}>{props.text}</p>
          {props.tags && <TagTable tags={props.tags} />}
          <div className='s_post_state'>

            <span className='p_fav' onClick={favoOnClick}>
              <IconButton>
                {checkHeart ? <HiHeart /> : <HiOutlineHeart />}
              </IconButton>
              <span className='p_text'>{numberFormat(props.favoriteSum, checkHeart, props.favorited)}</span>
            </span>


            {props.comment && props.commentSum !== undefined &&
              <span className='p_com' onClick={replyOnclick}>
                <IconButton>
                  <HiOutlineChatBubbleOvalLeft />
                </IconButton>
                <span className='p_text'>{numberFormat(props.commentSum)}</span>
              </span>
            }

            <span className='p_copy' onClick={copyOnclick}>
              <IconButton>
                <AiOutlineLink />
              </IconButton>
              <span className='p_text'>コピー</span>
            </span>

          </div>
        </div>
        <div>
          <ThreeButton />
        </div>
      </div>
      {props.more &&
        <Link to={`/post/${props.slug}`} className='p_more'>返信を表示</Link>
      }
    </SPostItem>
  );
};


const SPostItem = styled.div<{ checkHeart: boolean }>`
  transition: 0.2s;
  &:hover {
    background-color: rgba(0,0,0,0.05);
  }
  border-bottom:#ddd solid 1px;
  .p_font {
    font-size: 1rem;
  }
  .p_big{
    font-size: 1.2rem;
  }
  .p_name {
    font-weight: 600;
  }
  .p_gray {
    color: rgb(90, 110, 120);
  }

  .p_main {
    display: flex;
    justify-content: space-between;
    .p_left{
      margin: 5px;
      img{
        width: 42px;
        height: 42px;
        border-radius: 50px;
        background-color: #eee;
      }
    }
    .p_right{
      width: 100%;
      margin: 5px 0 0 0;
      .p_head{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
    }
  }
  .p_more {
    display: block;
    color: var(--active-fg);
    font-size: 0.9rem;
    text-decoration: none;
    text-align: center;
    padding: 5px;
    transition: .1s;
    &:hover{
      background-color:rgba(0,0,0,0.05);
    }
  }


  .s_post_state{
    display:flex;
    user-select: none;
    color: var(--deactive-fg);
    >span{
      margin-inline-end: 8px;
      cursor: pointer;
      button {
        color: var(--deactive-fg);
        font-size: 20px;
      }
      .p_text{
        font-size: 0.8rem;
      }
    }

    .p_copy:hover{
      button {
        color: rgb(255, 145, 0);
      }
      span {
        color: rgb(255, 145, 0);
      }
    }
  
    .p_com:hover{
      button {
        color: rgb(30, 155, 240);
      }
      span {
        color: rgb(30, 155, 240);
      }
    }

    .p_fav {
      ${({ checkHeart }) => checkHeart ?
    'span, button{color: deeppink;}' : ''}
      &:hover {
        button {
          color: deeppink;
        }
        span {
          color: deeppink;
        }
      }
    }
  }
`;