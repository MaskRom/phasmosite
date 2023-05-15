import { ArticleItem } from '../../parts/item/ArticleItem';
import { TArticleTop } from '../../../types/TyAPI';
import React from 'react';



type TArticleTable = {
  articles: Array<TArticleTop>;
}

export const ArticleTable = (props: TArticleTable) => {


  return (
    <div>
      {props.articles ?
        props.articles.map((item, index) => {
          return (
            <ArticleItem
              key={index}

              slug={item.slug}
              tags={item.tags}
              favoriteSum={item.favoriteSum}
              title={item.title}
              subtitle={item.subtitle}
              image1={item.image1}
              created_at={item.created_at}
              user={item.user}
              version={item.version}
              edit={item.edit}
              display={item.display}
              icon={item.icon}
              favorited={item.favorited}
            />
          )
        }) : ''}
    </div>
  );
};