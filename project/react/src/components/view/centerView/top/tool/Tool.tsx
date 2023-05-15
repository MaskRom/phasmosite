import { Routes, Route, NavLink } from "react-router-dom";
import { SNestNav } from '../../../../../styled/SNestNav';
import { ToolIdentification } from './ToolIdentification';
import { ErrorPage } from '../../detail/ErrorPage';
import { ToolDifficulty } from './ToolDifficulty';
import React from 'react';


export const Tool = () => {
  return (
    <>
      <SNestNav>
        <div></div>
        <nav>
          <NavLink to='' end>
            ゴースト特定ツール
          </NavLink>
          <NavLink to='difficulty'>
            カスタム難易度作成
          </NavLink>
        </nav>
        <div></div>
      </SNestNav>
      <Routes>
        <Route path='' element={<ToolIdentification />} />
        <Route path='difficulty' element={<ToolDifficulty />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}