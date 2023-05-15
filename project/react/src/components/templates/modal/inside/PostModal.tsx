import TextareaAutosize from '@mui/material/TextareaAutosize';
import { AlertItem } from '../../../parts/alert/AlertItem';
import { modalState } from '../../../../recoil/modalState';
import { PostItem } from '../../../parts/item/PostItem';
import { snackbarState, TSnackbar } from '../../../../function/snackbar';
import { TagItem } from '../../../parts/item/TagItem';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePlus } from 'react-icons/hi';
import { AiFillCamera } from 'react-icons/ai';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import { MdCancel } from 'react-icons/md';
import { api } from '../../../../axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import React, { useState } from 'react';
import styled from 'styled-components';




export const PostModal = () => {

  const navigation = useNavigate();
  const modalPost = useRecoilValue(modalState).post;
  const snack = useRecoilValue(snackbarState);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isCommentSending, setIsCommentSending] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const maxImagesUpload = 4;
  const [text, setText] = useState<string>('');
  const inputId = Math.random().toString(32).substring(2);

  const [tags, setTags] = useState<string[]>(modalPost.source ? [] : modalPost.tags);
  const [tag, setTag] = useState<string>('');

  const [name, setName] = useState<string>(cookies.name);

  const onChangeText = (e: any) => {
    setText(e.target.value);
  }

  const handleOnSubmit = async (e: React.SyntheticEvent): Promise<void> => {

    e.preventDefault();
    setIsCommentSending(true);

    const data = new FormData();

    data.append('images1', images[0]);
    data.append('images2', images[1]);
    data.append('images3', images[2]);
    data.append('images4', images[3]);
    data.append("display", name);
    data.append("icon", cookies.icon);
    data.append("text", text);

    tags.map((tag, index) => {
      data.append("tags", tag);
    })


    const postedComment = await api.post('/posts/',
      data
    ).then((res) => {
      setSnackbar((): TSnackbar => {
        return { ...snackbar, ...{ massage: '投稿しました！' } }
      })
      navigation(0);
      snack.clickfunc();
    }).catch((err) => {
      setSnackbar((): TSnackbar => {
        return { ...snackbar, ...{ massage: '投稿中にエラーが発生しました。内容に不備がないかを確認してください。' } }
      })
      snack.clickfunc();
    });

    setIsCommentSending(false);
  };

  const handleOnAddImage = (e: any) => {
    if (!e.target.files) return;
    setImages([...images, ...e.target.files]);
  };

  const handleOnRemoveImage = (index: number) => {
    // 選択した画像は削除可能
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleNewTag = (e: any) => {
    setTag(e.target.value)
  }
  const handleOnAddTags = (e: any) => {
    if (tag === '') return
    setTags([tag, ...tags]);
    setTag('');
  };

  const handleNewName = (e: any) => {
    setName(e.target.value)
  };

  const handleOnRemoveTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <SPostModal>
      <AlertItem
        severity='warning'
        message='255字以内で投稿・返信ができます。タグは最大５個まで追加できます。投稿後は投稿の編集・削除ができませんのでご注意ください。'
      />
      {modalPost.source &&
        <PostItem
          slug={modalPost.source.slug}
          tags={modalPost.source.tags}
          commentSum={modalPost.source.commentSum}
          favoriteSum={modalPost.source.favoriteSum}
          display={modalPost.source.display}
          icon={modalPost.source.icon}
          text={modalPost.source.text}
          image1={modalPost.source.image1}
          image2={modalPost.source.image2}
          image3={modalPost.source.image3}
          image4={modalPost.source.image4}
          created_at={modalPost.source.created_at}
          user={modalPost.source.user}
          edit={modalPost.source.edit}
          favorited={modalPost.source.favorited}
          more={false}
        />}

      <form className='post_main'>
        <div>
          <img
            className='user_icon'
            src={`${process.env.REACT_APP_BASE_PATH}/media/default_user_icon/icon${cookies.icon}.png`}
            alt='usericon'
          />
        </div>
        <div className='post_main_center'>
          <div>
            <input
              className='input_name'
              type='text'
              maxLength={12}
              placeholder='名前'
              value={name}
              onChange={handleNewName}
            />
          </div>
          <div className='post_textarea'>
            <TextareaAutosize
              className='text_box'
              aria-label="minimum height"
              minRows={3}
              maxLength={255}
              onChange={onChangeText}
              value={text}
              placeholder={modalPost.source ? 'コメントを残す' : '仲間に情報を共有しよう'}
            />
            <div className='image_view_field'>
              {images.map((image, i) => (
                <div
                  className="image_view" key={i}>
                  <IconButton
                    aria-label='delete image'
                    style={{
                      position: 'absolute',
                      color: '#ddd',
                    }}
                    onClick={() => handleOnRemoveImage(i)}
                  >
                    <MdCancel />
                  </IconButton>
                  <img src={URL.createObjectURL(image)} />
                </div>
              ))}
            </div>
            {tags.map((tag, i) => (
              <TagItem
                key={i}
                name={tag}
                remove={() => handleOnRemoveTag(i)}
              />
            ))}

          </div>
          <div className='post_options'>
            {!modalPost.source ?
              <div className='post_append_tag'>
                <IconButton
                  style={{ color: "rgb(30,155,240)" }}
                  aria-label="add to shopping cart"
                  onClick={handleOnAddTags}
                >
                  <HiOutlinePlus />
                </IconButton>
                <input
                  className='tag_text_box'
                  type="text"
                  size={5}
                  maxLength={50}
                  placeholder="タグを追加"
                  value={tag}
                  onChange={handleNewTag}
                />
              </div>
              : ''}
            <div className='image_upload'>
              <IconButton
                style={{ color: "rgb(30,155,240)" }}
                aria-label="upload picture"
                component="label"
                disabled={images.length >= maxImagesUpload}
              >
                <input
                  hidden
                  accept="image/*,.png,.jpg,.jpeg"
                  type="file"
                  id={inputId}
                  onChange={(e) => handleOnAddImage(e)}
                />
                <AiFillCamera />
              </IconButton>
            </div>
            <Button
              className='post_submit'
              variant="contained"
              disableElevation
              type="submit"
              onClick={handleOnSubmit}
              style={{
                backgroundColor: "rgb(30,155,240)",
                borderRadius: "50px",
              }}
            >
              {modalPost.source ? '返信' : '投稿'}
            </Button>
          </div>
        </div>
      </form>

    </SPostModal>
  );
};


const SPostModal = styled.div`
  width: 600px;
  @media screen and (max-width: 600px) {
      width: 100%;
  }
  .post_main{
    display: flex;
    &>div{margin:5px;}
    .user_icon{
      width: 42px;
      height: 42px;
      border-radius: 50px;
    }
    .post_main_center{
        margin: 10px 10px 0 10px;
        width: 100%;
        .post_textarea{
            border-bottom: 1px solid #bbb;
        }
        .image_view_field{
            display: flex;
            flex-wrap: wrap;
            .image_view{
                position: "relative";
                width: 40%;
                margin: 1%;
                img{
                    width: 100%;
                    border-radius: 10px;
                }
            }
        }
        .post_append_tag{
            display: flex;
        }
        .image_upload{
            flex-grow: 1;
        }
        .post_submit{
        }
        .post_options{
            display: flex;
            flex-wrap:wrap;
            justify-content: flex-start;
            margin: 5px;
            &div:last-of-type {
                margin-left: auto;
            }
        }
    }
    .tag_text_box{
      resize: none;
      height: auto;
      font-size: 1rem;
      outline: none;
      border: none;
    }
    .input_name{
      font-size: 1rem;
      color: #333;
      outline: none;
      border: none;
      border-bottom: 1px solid #bbb;
      margin-block-end: 10px;
    }
    .text_box{
      resize: none;
      width: 100%;
      height: auto;
      font-size: 1.2rem;
      outline: none;
      border: none;
    }
  }
`;