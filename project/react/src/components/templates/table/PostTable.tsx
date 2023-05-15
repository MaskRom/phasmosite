import { PostItem } from '../../parts/item/PostItem';
import { TPostTop } from '../../../types/TyAPI';
import React from 'react';



type TPostTable = {
  posts: Array<TPostTop>
};

export const PostTable = (props: TPostTable) => {
  return (
    <>
      {props.posts ?
        props.posts.map((item, index) => {
          return (
            <PostItem
              key={index}

              slug={item.slug}
              tags={item.tags}
              commentSum={item.commentSum}
              favoriteSum={item.favoriteSum}
              display={item.display}
              icon={item.icon}
              text={item.text}
              image1={item.image1}
              image2={item.image2}
              image3={item.image3}
              image4={item.image4}
              created_at={item.created_at}
              user={item.user}
              edit={item.edit}
              favorited={item.favorited}
          
              more={true}
              comment={true}
            />
          )
        }) : ''}
    </>
  );
};
