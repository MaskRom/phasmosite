import React from 'react';
import { Link } from 'react-router-dom';
import { styleByURLState } from '../../../../recoil/styleByURLState';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import Style from '../../../../types/TyStyle';
import { SNestNav } from '../../../../styled/SNestNav';



export const Search: React.VFC = () => {

  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return ({
        title: '検索結果：',
        isHeaderTop: false,
        nav: true,
        pageAlert: true,
        button: 'post',
        side: true,
        back: '/post',
      })
    })
  }, []);


  return (
    <SNestNav>

    </SNestNav>
  );
}