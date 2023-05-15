import {
  toolDifficultyPreset,
  toolDifficultyState,
  toolDifficultyValueState
} from '../../../../../recoil/toolDifficultyState';
import { ToolPresetTable } from '../../../../templates/table/ToolPresetTable';
import { ToolCustomText } from '../../../../parts/toolItem/ToolCustomText';
import { ToolCustomItem } from '../../../../parts/toolItem/ToolCustomItem';
import { ToolCustomURL } from '../../../../parts/toolItem/ToolCustomURL';
import { styleByURLState } from '../../../../../recoil/styleByURLState';
import { NowLoading } from '../../../../parts/skeleton/NowLoading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { CustomItem } from '../../../../parts/item/CustomItem';
import { Field } from '../../../../templates/field/Field';
import Style from '../../../../../types/TyStyle';
import { useEffect, useState } from 'react';
import React from 'react';
import { ErrorPage } from '../../detail/ErrorPage';



export const ToolDifficulty = () => {
  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return ({
        title: 'カスタム難易度作成',
        isHeaderTop: true,
        nav: true,
        pageAlert: false,
        button: '',
        side: true,
        back: '/',
      })
    })
  }, []);

  // API 取得
  const toolDifficulty = useRecoilValueLoadable(toolDifficultyState);
  const toolDifficultyPre = useRecoilValueLoadable(toolDifficultyPreset);


  const [
    toolDifficultyValue,
    setToolDifficultyValue] = useRecoilState(toolDifficultyValueState);


  const [hasValue, setHasValue] = useState<boolean>(false);

  useEffect(() => {
    if (toolDifficulty.state === 'hasValue') {
      if (Object.keys(toolDifficultyValue).length === 1) {
        for (let i of toolDifficulty.contents) {
          for (let j of i.item) {
            setToolDifficultyValue((toolDifficultyValue: any) => {
              return (
                {
                  ...toolDifficultyValue, ...{
                    [j.id]:
                      { now: j.default, magn: j.value[j.default - 1].magn }
                  }
                }
              )
            })
          }
        }
      }
      setHasValue(true);
    }
  }, [toolDifficulty.state])



  // クエリパラメータセット
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const queryString = query.toString();

  useEffect(() => {
    for (let i of Object.keys(toolDifficultyValue)) {
      let querySelect = query.get(i);
      if (i === 'text') {
        let text = querySelect ? querySelect : toolDifficultyValue.text;
        setToolDifficultyValue((toolDifficultyValue: any) => {
          return ({
            ...toolDifficultyValue, ...{ text: text }
          }
          )
        })
      } else if (querySelect) {
        setToolDifficultyValue((toolDifficultyValue: any) => {
          return (
            {
              ...toolDifficultyValue, ...{
                [i]:
                  { now: Number(querySelect), magn: 1 }
              }
            }
          )
        })
      }
    }
  }, [hasValue, queryString])

  if (toolDifficulty.state === 'hasValue') {
    return (
      <>
        <Field title='プリセット' help='カスタム難易度のテンプレートです。' fold={false}>
          <ToolPresetTable
            center={true}
            url='tool/difficulty'
            item={toolDifficultyPre.contents}
          />
        </Field>
        <ToolCustomURL />
        <ToolCustomText />
        {toolDifficulty.contents.map((item, index) => {
          return (
            <Field
              key={index}
              title={item.name}
              help={item.help}
              fold={true}
            >
              {item.item.map((item, index) => {
                return (
                  <CustomItem
                    key={index}

                    id={item.id}
                    hide_order={item.hide_order}
                    name={item.name}
                    text={item.text}
                    value={item.value}
                  />
                )
              })}
            </Field>
          )
        })
        }
        {/* <ToolCustomItem /> */}
      </>
    );
  } else if (toolDifficulty.state === 'loading') {

    return <NowLoading />
  } else {

    return <ErrorPage />
  }
}