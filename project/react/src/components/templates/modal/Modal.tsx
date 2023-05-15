import { modalState } from '../../../recoil/modalState';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { RxCross2 } from "react-icons/rx";
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { PostModal } from './inside/PostModal';
import { useLocation } from 'react-router-dom';



export const Modal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const [postOpen, setPostOpen] = useState<boolean>(false);
  const [imageOpen, setImageOpen] = useState<boolean>(false);

  const location = useLocation();

  const close = () => {
    setPostOpen(false);
    setImageOpen(false);
  };

  useEffect(() => {
    setModal(() => {
      return ({
        post: {
          tags: [],
          source: undefined,
          open: setPostOpen,
        },
        image: {
          url: '',
          open: setImageOpen,
        },
      }
      );
    })
  }, []);

  useEffect(() => { close() }, [location.pathname])

  if (postOpen || imageOpen) {
    return (
      <SModal>
        <div className='overlay'>
          <div className='content' onClick={(e) => e.stopPropagation()}>
            <div className='modal_head'>
              <IconButton onClick={close}>
                <RxCross2 />
              </IconButton>
            </div>
            <div className='modal_body'>
              {postOpen && <PostModal />}
            </div>
          </div>
        </div>
      </SModal>
    );
  } else {
    return null;
  };
};


const SModal = styled.div`
  .overlay{
    display: flex;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    justify-content: center;
    background-color:rgba(0, 0, 0, 0.4);
    z-index: 10;
  }
  .content{
    background-color: #fff;
    position:fixed;
    top: 10vh;
    max-height:80vh;
    max-width: 600px;
    border-radius: 16px;
    overflow-x: hidden;
    .modal_head{
      position: sticky;
      top: 0;
      width: 100%;
      padding: 5px;
      display: flex;
      justify-content: space-between;
      align-items:center;
      z-index: 1;
      background-color: #fff;
      border-bottom: solid 1px #ddd;
    }
    &::-webkit-scrollbar{
      background-color:transparent;
      width: 16px
    }
    &::-webkit-scrollbar-track{
      background-color:transparent;
      margin-top: 50px;
    }
    &::-webkit-scrollbar-thumb{
      border: 4px solid transparent;
      border-radius   :8px;
      background-clip :content-box;
      background-color:#777
    }
    &::-webkit-scrollbar-thumb:hover{
      background-color:rgba(119, 119, 119, 0.6)
    }
  }
  @media screen and (max-width: 500px) {
    .content{
      border-radius: 0;
      width: 100%;
      height: 100%;
      max-height: none;
      top: 0;
    }
  }
`;