import { CommentTable } from '../../table/CommentTable';
import { useOnScreen } from '../../../../useOnScreen';
import { CircularProgress } from '@mui/material';
import { useState, useRef } from 'react';
import { api } from '../../../../axios';



type TCommentInfiniteField = {
  sortNew?: boolean;
  slug?: string;
}

export const CommentInfiniteField = (props: TCommentInfiniteField) => {
  const [comments, setComments] = useState<any>([]);
  const [page, setPage] = useState<number>(1);

  const targetRef = useRef(null);
  const targetViewPosition = useOnScreen(targetRef);
  const [hasMore, setHasMore] = useState(true);

  if (hasMore && targetViewPosition === 'VISIBLE') {
    api.get(`/posts/${props.slug}`, {
      params: {
        page: page,
        sort: props.sortNew,
      }
    })
      .then((res) => {
        setComments([...comments, ...res.data]);
        setPage(page + 1);
      })
      .catch((err) => {
        setHasMore(false);
      });
  };


  return (
    <div>
      {/* {props.sortNew ? 'sortNew: true' : "sortNew: false"} */}

      {comments && <CommentTable posts={comments} />}
      {hasMore ?
        <div ref={targetRef} style={{ textAlign: 'center' }}>
          <CircularProgress style={{ color: '#aaa' }} />
        </div> :
        <div className='no_data_text'>これ以上ありません</div>
      }
    </div>
  )
}