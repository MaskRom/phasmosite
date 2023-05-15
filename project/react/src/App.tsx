import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { styleByURLState } from './recoil/styleByURLState';
import { Routes, Route, useLocation } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
// API
import { alertAPIState } from './recoil/APIState';
// view
import { TestView } from './components/view/centerView/TestVIew';
import { RightView } from './components/view/sideView/RightView';
import { LeftView } from './components/view/sideView/LeftView';
import { Home } from './components/view/centerView/top/Home';
import { Postlist } from './components/view/centerView/top/Postlist';
import { Post } from './components/view/centerView/detail/Post';
import { Tool } from './components/view/centerView/top/tool/Tool';
import { Articlelist } from './components/view/centerView/top/Articlelist';
import { Article } from './components/view/centerView/detail/Article';
import { Wiki } from './components/view/centerView/top/Wiki';
import { Ghost } from './components/view/centerView/detail/wiki/Ghost';
import { Equipment } from './components/view/centerView/detail/wiki/Equipment';
import { CursedItem } from './components/view/centerView/detail/wiki/CursedItem';
import { Evidence } from './components/view/centerView/detail/wiki/Evidence';
import { Map } from './components/view/centerView/detail/wiki/Map';
import { Config } from './components/view/centerView/detail/Config';
import { ErrorPage } from './components/view/centerView/detail/ErrorPage';
// parts
import { AlertList } from './components/parts/alert/AlertList';
import { Header } from './components/parts/header/Header';
import { Button } from './components/parts/Button';
import { Fooder } from './components/parts/Fooder';
import { Nav } from './components/parts/nav/Nav';
// function
import { Snackbar } from './function/snackbar';
// CSS
import './App.css';
import { modalState } from './recoil/modalState';
import { Modal } from './components/templates/modal/Modal';
import React from 'react';


export const App = () => {
  // Recoil styleByURL get
  const styleByURL = useRecoilValue(styleByURLState);
  // API
  const alertAPI = useRecoilValueLoadable(alertAPIState);
  // Cookies
  const [cookies, setCookie, removeCookie] = useCookies();
  useEffect(() => {
    if (!cookies.name) {
      setCookie('name', '名無しのユーザー', { maxAge: 60 * 60 * 24 * 14, sameSite: 'strict' });
    }
    if (!cookies.icon) {
      const iconIndex = 1 + Math.floor(Math.random() * 12);
      setCookie('icon', iconIndex, { maxAge: 60 * 60 * 24 * 14, sameSite: 'strict' });
    }
  }, []);

  const location = useLocation();
  // Modal
  const [modal, setModal] = useRecoilState(modalState);
  useEffect(() => {
    setModal((modal) => {
      return (
        { ...modal, ...{ post: { ...modal.post, ...{ source: undefined, tags: [] } } } }
      )
    })
  }, [location.pathname])

  return (
    <div className="App">
      <Header />
      {styleByURL.nav && <Nav />}
      <main>
        <div className='l_side'>
          <div className='tracking_side'>
            {styleByURL.side && <LeftView />}
          </div>
        </div>
        <div className={`center ${styleByURL.nav && 'c_nav'}`}>
          {alertAPI.state === 'hasValue' && styleByURL.pageAlert &&
            <AlertList alertList={alertAPI.contents} />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/post'>
              <Route index={true} element={<Postlist />} />
              <Route path=':postId' element={<Post />} />
            </Route>
            <Route path='/tool/*' element={<Tool />} />
            <Route path='/article'>
              <Route index={true} element={<Articlelist />} />
              <Route path=':articleId' element={<Article />} />
            </Route>
            <Route path='/wiki'>
              <Route index={true} element={<Wiki />} />
              <Route path='ghost/:ghostId' element={<Ghost />} />
              <Route path='equipment/:equipmentId' element={<Equipment />} />
              <Route path='curseditem/:curseditemId' element={<CursedItem />} />
              <Route path='evidence/:evidenceId' element={<Evidence />} />
              <Route path='map/:mapId' element={<Map />} />
              <Route path='patchnote/' element={<TestView />} />
              <Route path='patchnote/:patchnoteId' element={<TestView />} />
            </Route>
            <Route path='/config' element={<Config />} />
            <Route path='/*' element={<ErrorPage />} />
          </Routes>
          <Fooder center={true} />
        </div>
        <div className='r_side'>
          <div className='tracking_side'>
            {styleByURL.side && <RightView />}
          </div>
        </div>
        {styleByURL.button && <Button />}
      </main>

      <Snackbar />
      <Modal />
    </div>
  );
}