import React from 'react';
import { Link } from 'react-router-dom';
import { styleByURLState } from '../../../recoil/styleByURLState';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import Style from '../../../types/TyStyle';


export const TestView: React.VFC = () => {
  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return({
        title: 'テスト',
        isHeaderTop: true,
        nav: true,
        pageAlert: true,
        button: '',
        side: true,
        back: '/',
      })
    })
  }, []);

  return(
    <>
      <h1>見出し(h1)</h1>
      <h2>見出し(h2)</h2>
      <h3>見出し(h3)</h3>
      <h4>見出し(h4)</h4>
      <h5>見出し(h5)</h5>
      <h6>見出し(h6)</h6>
      <p>テキストテキストテキストテキスト</p>
      <br />
      <Link to='/'>/</Link><br />
      <Link to='/search/post'>/search/post</Link><br />
      <Link to='/search/article'>/search/article</Link><br />
      <Link to='/post'>/post</Link><br />
      <Link to='/post/:postId'>/post/postId</Link><br />
      <Link to='/tool/identification'>/tool/identification</Link><br />
      <Link to='/tool/difficulty'>/tool/difficulty</Link><br />
      <Link to='/article'>/article</Link><br />
      <Link to='/article/:articleId'>/article/articleId</Link><br />
      <Link to='/wiki'>/wiki</Link><br />
      <Link to='/wiki/ghost/:ghostId'>/wiki/ghost/:ghostId</Link><br />
      <Link to='/wiki/equipment/:equipmentId'>/wiki/equipment/:equipmentId</Link><br />
      <Link to='/wiki/curseitem/:curseitemId'>/wiki/curseitem/:curseitemId</Link><br />
      <Link to='/wiki/evidence/:evidenceId'>/wiki/evidence/:evidenceId</Link><br />
      <Link to='/wiki/map/:mapId'>/wiki/map/:mapId</Link><br />
      <Link to='/wiki/map/:mapId'>/wiki/map/:mapId</Link><br />
      <Link to='/wiki/patchnote'>/wiki/patchnote</Link><br />
      <Link to='/wiki/patchnote/:patchnoteId'>/wiki/patchnote/:patchnoteId</Link><br />
      <Link to='/profile/Maskrom/favorite'>/profile/Maskrom/favorite</Link><br />
      <Link to='/profile/Maskrom/article'>/profile/Maskrom/article</Link><br />
      <Link to='/profile/Maskrom/edit'>/profile/Maskrom/edit</Link><br />
      <Link to='/config'>/config</Link><br /><br />
      <Link to='/login'>/login</Link><br />
      <Link to='/register'>/register</Link>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </>
  );
}