import { NowLoading } from '../../../parts/skeleton/NowLoading';
import { ArticleTable } from '../../table/ArticleTable';
import { TArticleTop } from '../../../../types/TyAPI';
import { useOnScreen } from '../../../../useOnScreen';
import { api } from '../../../../axios';
import { useState } from 'react';
import React from 'react';



type TArticleInfiniteField = {
  sortNew?: boolean;
  tags?: Array<string>;
};

export const ArticleInfiniteField = (props: TArticleInfiniteField) => {

  const [articles, setArticles] = React.useState<TArticleTop[]>([]);
  const [page, setPage] = React.useState<number>(1);

  const targetRef = React.useRef(null);
  const targetViewPosition = useOnScreen(targetRef);
  const [hasMore, setHasMore] = useState(true);
  if (hasMore && targetViewPosition === 'VISIBLE') {
    api.get(`/articles`, {
      params: {
        page: page,
        tags: props.tags,
        sort: props.sortNew,
      }
    })
      .then((res) => {
        setArticles([...articles, ...res.data]);
        setPage(page + 1);
      })
      .catch((err) => {
        setHasMore(false);
      });
  };
  return (
    <div>
      {/* {props.sortNew ? 'sortNew: true' : "sortNew: false"} */}

      {articles && <ArticleTable articles={articles} />}
      {hasMore ?
        <div ref={targetRef} style={{ textAlign: 'center' }}>
          <NowLoading />
        </div> :
        <div className='no_data_text'>これ以上ありません</div>
      }
    </div>
  );
};