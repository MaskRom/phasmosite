import { snackbarState, TSnackbar } from '../../function/snackbar';
import { styleByURLState } from '../../recoil/styleByURLState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../../recoil/modalState';
import { RiArticleLine } from "react-icons/ri";
import { MdOutlineChat } from 'react-icons/md';
import { HiPencil } from 'react-icons/hi';
import { Tooltip } from '@mui/material';
import styled from 'styled-components';
import Fab from '@mui/material/Fab';
import React from 'react';




export const Button = () => {

  const button = useRecoilValue(styleByURLState).button;

  const [modal, setModal] = useRecoilState(modalState);

  const [snackbar, setSnackbar] = useRecoilState(snackbarState);

  const postOnClick = () => {
    setModal(() => {
      return (
        { ...modal, ...{ post: { ...modal.post, ...{ source: undefined } } } }
      )
    })
    modal.post.open(true);
  };

  const commentOnClick = () => {
    modal.post.open(true);
  };

  type TbuttonSet = {
    icon: any;
    text: string | false;
    onClick: any;
  };

  const buttonSet: TbuttonSet = {
    icon:
      button === 'post' ? <HiPencil /> :
        button === 'comment' ? <MdOutlineChat /> :
          button === 'article' && <RiArticleLine />,
    text:
      button === 'post' ? '投稿する' :
        button === 'comment' ? 'コメントを残す' :
          button === 'article' && '記事を作成',
    onClick:
      button === 'post' ? postOnClick :
        button === 'comment' ? commentOnClick :
          button === 'article' && postOnClick,
  };

  return (
    <SButton>
      <div className='hig0'></div>
      <div className='hig0'></div>
      <div>
        <div>
          <Tooltip title={buttonSet.text} placement='top' disableInteractive>
            <Fab className='post_button' onClick={()=>{
              setSnackbar((): TSnackbar => {
                return { ...snackbar, ...{ massage: '現在この機能は利用できません。' } }
              })
              snackbar.clickfunc();
            }}>
              {buttonSet.icon}
            </Fab>
          </Tooltip>
        </div>
      </div>
    </SButton>
  );
};


const SButton = styled.div`
  position: fixed;
  display: grid;
  grid-template-columns: 1fr minmax(0, var(--main-width)) 1fr;
  width: 100%;
  height: 0;
  bottom: 120px;
  z-index: 10;
  .hig0{
    height: 0;
  }
  div{
    .post_button{
      box-sizing: content-box;
      background-color: rgb(30, 155, 240);
      color: #eee;
      font-size: 30px;
      padding: 10px;
      margin: 0 10px 0 20px;
      @media screen and (max-width: 500px) {
        &{
          font-size: 25px;
          padding: 2px;
        }
      }
    }
  }
`;