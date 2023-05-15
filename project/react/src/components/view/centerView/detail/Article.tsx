import React from 'react';
import { Link } from 'react-router-dom';
import { styleByURLState } from '../../../../recoil/styleByURLState';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import Style from '../../../../types/TyStyle';


export const Article: React.VFC = () => {

  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return ({
        title: '記事',
        isHeaderTop: false,
        nav: true,
        pageAlert: true,
        button: 'post',
        side: true,
        back: '/',
      })
    })
  }, []);


  return (
    <>
      <h1>記事</h1>
    </>
  );
}