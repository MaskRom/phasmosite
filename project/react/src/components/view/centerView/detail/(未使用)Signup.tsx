import { styleByURLState } from '../../../../recoil/styleByURLState';
import { SForm } from '../../../../styled/SForm';
import Style from '../../../../types/TyStyle';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import React from 'react';


export const Signup: React.FC = () => {

  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return ({
        title: 'アカウント作成',
        isHeaderTop: false,
        nav: false,
        pageAlert: false,
        button: '',
        side: true,
        back: '/',
      })
    })
  }, []);

  return (
    <SForm>
      <form method='POST'>
        <label htmlFor='user_id'>ユーザーID</label>
        <input type='text' name='user_id' />
        <label htmlFor='user_name'>表示名</label>
        <input type='text' name='user_name' />
        <label htmlFor='user_password'>パスワード</label>
        <input type='password' name='user_password' />
        <label htmlFor='user_password'>パスワード（確認用）</label>
        <input type='password' name='user_password' />
        <input type='submit' value="アカウント作成" />
      </form>
      <Link to='/login' className='under_text'>
        既にアカウントをお持ちの方はこちら
      </Link>
    </SForm>
  );
}