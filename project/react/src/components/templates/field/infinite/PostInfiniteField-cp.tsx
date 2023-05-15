import { NowLoading } from '../../../parts/skeleton/NowLoading';
import InfiniteScroll from 'react-infinite-scroller';
import { TPostTop } from '../../../../types/TyAPI';
import { PostTable } from '../../table/PostTable';
import { useState } from 'react';
import React from 'react';
import { api } from '../../../../axios';



type TPostInfiniteField = {
  sortNew?: boolean;
  tags?: Array<string>;
};

export const PostInfiniteField = (props: TPostInfiniteField) => {
  const [posts, setPosts] = React.useState<TPostTop[]>([]);
  const [hasMore, setHasMore] = useState(true);
  
  // const loadMore = async (page: number) => {
  //   api.get('/posts', {
  //     params: {
  //       page: page,
  //       tags: props.tags,
  //       sort: props.sortNew,
  //     }
  //   })
  //     .then((res) => {
  //       setPosts([...posts, ...res.data])
  //     })
  //     .catch((err) => {
  //       setHasMore(false);
  //     })
  // }

  const loadMore = async (page: number) => {
    try {
      const res = await api.get('/posts', {
        params: {
          page: page,
          tags: props.tags,
          sort: props.sortNew,
        }
      });
      const newPosts = res.data;
  
      if (newPosts.length === 0) {
        setHasMore(false);
        return;
      }
  
      setPosts([...posts, ...newPosts]);
    } catch (error) {
      setHasMore(false);
    }
  };
  

  return (
    <div>
      {props.sortNew ? 'sortNew: true' : "sortNew: false"}
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<NowLoading key={0} />}
      >
        <PostTable posts={posts} />
      </InfiniteScroll>
    </div>
  );
};