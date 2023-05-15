import { BiChevronRight } from 'react-icons/bi';
import { TagTable } from '../table/TagTable';
import { MdSort } from 'react-icons/md';
import styled from 'styled-components';
import { useState } from 'react'
import React from 'react';



type TInfinite = {
  children: React.ReactElement;
  title: string;
  sortNew?: boolean;
  tags: Array<string>;
  fold: boolean;
  slug?: string;
}

export const InfiniteField: React.FC<TInfinite> = (props) => {

  const [open, setOpen] = useState(props.fold);
  const onClick = () => setOpen((prev: boolean) => !prev);

  const { title, sortNew, tags, slug, children } = props;
  const [sort, setSort] = React.useState(sortNew);
  const propsChildren = React.cloneElement(children, { sortNew: sort, tags: tags, slug: slug });

  return (
    <SInfiniteField>
      <h2 className='field_head hd_re'>
        <BiChevronRight className={`fold_button ${open ? 'fold_open' : ''}`} onClick={onClick} />
        <span className='s_title'>{tags.length ? '関連する' : '全ての'}{title}</span>
        {sortNew !== undefined &&
          <div className='infinite_field_sort' onClick={() => setSort(!sort)}>
            <MdSort className='sort_icon' />
            <span>並べ替え（{sort ? '新着順' : '古い順'}）</span>
          </div>
        }
      </h2>

      <div className={`collapse ${open ? 'visible' : 'hidden'}`}>
        <TagTable tags={tags} />
        {propsChildren}
      </div>
    </SInfiniteField>
  );
};


const SInfiniteField = styled.div`
  .field_head {
    user-select: none;
    display: flex;
    align-items: center;
    color: #eee;
    background-color: #222;
    border-bottom: 1px solid #555;
    .fold_button{
      box-sizing: content-box;
      padding: 5px;
      font-size:25px;
      transition:.1s;
      cursor: pointer;
      &:hover{
        color:#aaa;
      }
      &.fold_open{
        transform:rotate(90deg);
      }
    }
    .s_title {
      font-size: 16px;
      margin: 0.8rem 0.5rem;
    }

    .infinite_field_sort {
      display: flex;
      align-items: center;
      margin: 10px;
      margin-left: auto;
      cursor: pointer;
      transition: .1s;
      .sort_icon {
        font-size: 22px;
        margin: 5px;
      }
      &:hover {
          opacity: 0.85;
      }
    }
  }
  .collapse {
    transition: height 300ms;
    overflow: hidden;
  }
  .visible {
    height: auto;
  }
  .hidden {
    height: 0;
  }
`;