import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import logo from './logo_phasmophobia.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IconButton } from "@mui/material";
import React from 'react';



type TTitle = {
  isHeaderTop: boolean;
  back: string;
}
export const Title = (props: TTitle) => {

  const navigate = useNavigate();

  return (
    <STitle isHeaderTop={props.isHeaderTop}>
      <div className="hd_title_main">
        <Link to='/'>
          <img src={logo} alt="logo" />
        </Link>
        <h1 className="hd_re">
          <span>Phasmophobia</span>
          <span>日本語コミュニティ&#x1f1ef;&#x1f1f5;</span>
        </h1>
      </div>
      {!props.isHeaderTop &&
        <IconButton className='return_icon' onClick={() => navigate(props.back)}>
          <BiLeftArrowAlt />
        </IconButton>
      }
    </STitle>
  );
}

const STitle = styled.div<{ isHeaderTop: boolean }>`
  display: grid;
  grid-template-columns: 1fr 50px;
  text-align: center;
  .hd_title_main{
    display: flex;
    align-items: center;
    a, img{
      width : var(--header-hight);
      height: var(--header-hight);
      ${({ isHeaderTop }) => isHeaderTop ? '' :
    '@media screen and (max-width: 700px) {&{display: none;}}'};
    }
    h1{
      font-size: 13px;
      font-weight: 500;
      color: #eee;
      span{display: inline-block;}
      @media screen and (max-width: 1020px) {&{display: none;}}
    }
  }
  .return_icon{
    margin: auto 5px;
    color: #eee;
    padding: 8%;
    width: 35px;
    height: 35px;
    transition: 0.2s;
    &:hover {
      background-color: #222;
    }
  }
`;