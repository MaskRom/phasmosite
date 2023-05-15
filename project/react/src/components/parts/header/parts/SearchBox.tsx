import { CgSearch } from "react-icons/cg";
import styled from "styled-components";
import React from 'react';



export const SearchBox: React.VFC = () => {
  return (
    <SSearchBox>
      <form method="get" action="#">
        <CgSearch className="search_icon" />
        <input placeholder="検索" />
      </form>
    </SSearchBox>
  );
}


const SSearchBox = styled.div`
  width: 100%;
  margin: auto;
  position: relative;
  text-align: center;
  form{
    display: flex;
    position: relative;
    .search_icon{
      top: 5px;
      left: 5px;
      position: absolute;
      font-size: 25px;
      color: #777;
    }
  }
  input{
    width: 100%;
    padding: 3px 0 3px 35px;
    border-radius: 50px;
    border: none;
    font-size: 18px;
    background: #eee;
    &:focus {
      outline: solid 2px deepskyblue;
      background: #fff;
    }
  }
`;