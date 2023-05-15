import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';


export const Fooder = (props: {center: boolean}) => {
  return (
    <SFooder className={ props.center ? 'fooder_center': '' }>
      <Link to='/'>このサイトについて</Link>
      <Link to='/'>利用規約</Link>
      <Link to='/'>プライバシーポリシー</Link>
      <br />
      <small>サイト運営:MaskROM</small>
    </SFooder>
  );
};


const SFooder = styled.div`
  margin: 15px 0;
  text-align: center;
  color: #aaa;
  a {
    margin: 5px;
    text-decoration: none;
    color: #aaa;
    &:hover {
      text-decoration: underline;
    }
  }
  &.fooder_center{
    color: #333;
    a {
      color: #333;
    }
  }
`;