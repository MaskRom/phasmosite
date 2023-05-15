import { styleByURLState } from '../../../../recoil/styleByURLState';
import { SForm } from '../../../../styled/SForm';
import Style from '../../../../types/TyStyle';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { AlertItem } from '../../../parts/alert/AlertItem';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useForm } from "react-hook-form";
import axios from 'axios';
import React from 'react';
import { api } from '../../../../axios';


export const Login: React.FC = () => {

  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return ({
        title: 'ログイン',
        isHeaderTop: false,
        nav: false,
        pageAlert: false,
        button: '',
        side: true,
        back: '/',
      })
    })
  }, []);

  //const history = useHistory();
  const navigation = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const [hasError, setHasError] = useState<boolean>(false);
  const getJwt = async (data: any) => {
    await api.post(`/auth/create`,
      {
        username: data.username,
        password: data.password,
      },
    )
      .then(function (res) {
        navigation('/');
      })
      .catch(err => {
        setHasError(true);
      });
  };

  return (
    <SForm>
      {hasError &&
        <AlertItem message="ユーザIDかパスワードが間違っています" severity="error" />}
      <form method='POST' onSubmit={handleSubmit(getJwt)} >
        <label htmlFor='username'>ユーザーID</label>
        <input type='text'  {...register('username')} />
        <label htmlFor='password'>パスワード</label>
        <input type='password' {...register('password', { required: true })} />
        <input type='submit' value="ログイン" />
      </form>
      <Link to='/signup' className='under_text'>
        アカウントを持っていない方はこちら
      </Link>
    </SForm>
  );
}