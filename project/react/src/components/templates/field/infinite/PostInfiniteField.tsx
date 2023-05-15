import CircularProgress from '@mui/material/CircularProgress';
import { useOnScreen } from '../../../../useOnScreen';
import { TPostTop } from '../../../../types/TyAPI';
import { PostTable } from '../../table/PostTable';
import { api } from '../../../../axios';
import { useState } from 'react';
import React from 'react';
import { NowLoading } from '../../../parts/skeleton/NowLoading';



type TPostInfiniteField = {
  sortNew?: boolean;
  tags?: Array<string>;
};

export const PostInfiniteField = (props: TPostInfiniteField) => {

  const [posts, setPosts] = React.useState<TPostTop[]>([]);
  const [page, setPage] = React.useState<number>(1);

  const targetRef = React.useRef(null);
  const targetViewPosition = useOnScreen(targetRef);
  const [hasMore, setHasMore] = useState(true);
  if (hasMore && targetViewPosition === 'VISIBLE') {
    api.get(`/posts`, {
      params: {
        page: page,
        tags: props.tags,
        sort: props.sortNew,
      }
    })
      .then((res) => {
        setPosts([...posts, ...res.data]);
        setPage(page + 1);
      })
      .catch((err) => {
        setHasMore(false);
      });
  };
  return (
    <div>
      {/* {props.sortNew ? 'sortNew: true' : "sortNew: false"} */}

      {posts && <PostTable posts={posts} />}
      {hasMore ?
        <div ref={targetRef} style={{ textAlign: 'center' }}>
          <NowLoading />
        </div> :
        <div className='no_data_text'>これ以上ありません</div>
      }
    </div>
  );
};