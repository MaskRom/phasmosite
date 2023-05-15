import { CommentInfiniteField } from '../../../templates/field/infinite/CommentInfiniteField';
import { InfiniteField } from '../../../templates/field/InfiniteField';
import { styleByURLState } from '../../../../recoil/styleByURLState';
import { NowLoading } from '../../../parts/skeleton/NowLoading';
import { modalState } from '../../../../recoil/modalState';
import { PostItem } from '../../../parts/item/PostItem';
import { TPostTop } from '../../../../types/TyAPI';
import Style from '../../../../types/TyStyle';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { api } from '../../../../axios';
import { ErrorPage } from './ErrorPage';
import React from 'react';



export const Post = () => {
  const params = useParams();
  const postId = params.postId;
  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return ({
        title: '投稿',
        isHeaderTop: false,
        nav: true,
        pageAlert: true,
        button: 'comment',
        side: true,
        back: '/post',
      })
    })
  }, []);

  const [modal, setModal] = useRecoilState(modalState);

  const [post, setPost] = useState<TPostTop | null | false>(null);
  useEffect(() => {
    api.get(`/posts/${postId}`, {
      params: {
        source: 'true',
      }
    })
      .then((res) => {
        setPost(res.data);
        setModal((modal) => {
          return (
            { ...modal, ...{ post: { ...modal.post, ...{ source: res.data } } } }
          )
        })
      })
      .catch((err) => {
        setPost(false);
      });
  }, [postId]);

  if (post) {
    return (
      <>
        <PostItem
          slug={post.slug}
          tags={post.tags}
          commentSum={post.commentSum}
          favoriteSum={post.favoriteSum}
          display={post.display}
          icon={post.icon}
          text={post.text}
          image1={post.image1}
          image2={post.image2}
          image3={post.image3}
          image4={post.image4}
          created_at={post.created_at}
          user={post.user}
          edit={post.edit}
          favorited={post.favorited}
          more={false}
          top={true}
          comment={true}
        />
        <InfiniteField
          title='コメント'
          sortNew={false} tags={[]}
          slug={postId}
          fold={true}
        >
          <CommentInfiniteField />
        </InfiniteField>
      </>
    );

  } else if (post === null) {
    return <NowLoading />

  } else {
    return <ErrorPage />
  }

}