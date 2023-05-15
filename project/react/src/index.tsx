import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from "react-cookie";
import './index.css';
import { App } from './App';
import ScrollToTop from './ScrollToTop'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <CookiesProvider>
      <BrowserRouter>
        <RecoilRoot>
          <ScrollToTop />
          <App />
        </RecoilRoot>
      </BrowserRouter>
    </CookiesProvider>

);
