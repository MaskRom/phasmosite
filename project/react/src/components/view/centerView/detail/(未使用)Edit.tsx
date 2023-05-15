import React from 'react';
import { Link } from 'react-router-dom';
import { styleByURLState } from '../../../../recoil/styleByURLState';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import Style from '../../../../types/TyStyle';


export const Edit: React.VFC = () => {

  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return ({
        title: 'プロフィールを編集',
        isHeaderTop: false,
        nav: true,
        pageAlert: true,
        button: '',
        side: true,
        back: '/',
      })
    })
  }, []);


  return (
    <>
      <h1>プロフィールを編集</h1>
    </>
  );
}