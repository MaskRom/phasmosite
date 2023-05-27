import React from 'react';
import { Link } from 'react-router-dom';
import { styleByURLState } from '../../../../recoil/styleByURLState';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import Style from '../../../../types/TyStyle';
import { api } from '../../../../axios';

export const Profile: React.FC = () => {

  React.useEffect(() => {
    api.get(`/auth/loginuser`)
      .then((res) => {
        // console.log(res);
      });
  }, []);

  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return({
        title: 'プロフィール',
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
      <h1>プロフィール</h1>
    </>
  );
}