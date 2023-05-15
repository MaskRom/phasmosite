import React from 'react';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import { BiBookBookmark } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { RiArticleLine } from "react-icons/ri";
import { RiHashtag } from "react-icons/ri";
import { FaGhost } from "react-icons/fa";


export const Nav = () => {
  return (
    <SNav>
      <div></div>
      <nav className="nav_main">
        <NavLink to="/" end>
          <AiOutlineHome className='icon' />
          <p>ホーム</p>
        </NavLink>
        <NavLink to="/post">
          <RiHashtag className='icon' />
          <p>投稿</p>
        </NavLink>
        <NavLink to="/tool" >
          <FaGhost className='tool' />
          <p>ツール</p>
        </NavLink>
        <NavLink to="/article">
          <RiArticleLine className='icon' />
          <p>記事一覧</p>
        </NavLink>
        <NavLink to="/wiki">
          <BiBookBookmark className='icon' />
          <p>Wiki</p>
        </NavLink>
      </nav>
      <div></div>
    </SNav>
  );
};


const SNav = styled.div`
  position: fixed;
  /* top: var(--header-hight); */
  top: var(--header-hight);
  display: grid;
  grid-template-columns: 1fr minmax(0, var(--main-width)) 1fr;
  width: 100%;
  z-index: 2;
  height: var(--nav-hight);
  .nav_main {
    display: flex;
    a {
      width: 100%;
      text-align: center;
      background-color: #fff;
      text-decoration: none;
      color: var(--deactive-fg);
      background-color: rgba(255, 255, 255, 0.75);
      border-top: #ddd solid 1px;
      border-bottom: #ddd solid 1px;
      backdrop-filter: blur(12px);
      p {
        font-size: 12px;
        font-weight: 600;
      }
      svg {
        width: 25px;
        height: 25px;
        margin: 1px;
        padding: 1px;
      }
      &:hover {
        background-color: rgba(225, 225, 225, 0.75);
      }
    }
    .tool {
      background: linear-gradient(to bottom, #2f0644, blue);
      border-radius: 4px;
      padding: 3px;
      color: #fff;
    }
    .active {
      border-bottom: solid var(--active-fg) 5px;
      color: var(--active-fg);
    }
  }
`;