import React from 'react';
import { Link } from 'react-router-dom';
import { styleByURLState } from '../../../../recoil/styleByURLState';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import Style from '../../../../types/TyStyle';


export const Config: React.VFC = () => {

  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return ({
        title: '設定',
        isHeaderTop: false,
        nav: false,
        pageAlert: true,
        button: '',
        side: true,
        back: '/',
      })
    })
  }, []);


  return (
    <>
      <h1>設定</h1>
    </>
  );
}