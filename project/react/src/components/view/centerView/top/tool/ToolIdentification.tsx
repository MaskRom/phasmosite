import {
  toolIdentificationItemState, toolIdentificationMenu,
} from '../../../../../recoil/toolIdentificationState';
import {
  cursedItemTopAPIState,
  evidenceTopAPIState
} from '../../../../../recoil/APIState';
import { IdentificationEvidenceTable } from '../../../../templates/table/IdentificationEvidenceTable';
import { ToolHightProbabilityGhost } from '../../../../parts/toolItem/ToolHightProbabilityGhost';
import { IdentificationGhostTable } from '../../../../templates/table/IdentificationGhostTable';
import { ToolIdentificationMenu } from '../../../../parts/toolItem/ToolIdentificationMenu';
import { IdentificationTable } from '../../../../templates/table/IdentificationTable';
import { styleByURLState } from '../../../../../recoil/styleByURLState';
import { FieldTool } from '../../../../templates/field/FieldTool';
import { NowLoading } from '../../../../parts/skeleton/NowLoading';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { ErrorPage } from '../../detail/ErrorPage';
import Style from '../../../../../types/TyStyle';
import styled from 'styled-components';
import { useEffect } from 'react';
import { AlertItem } from '../../../../parts/alert/AlertItem';
import React from 'react';



export const ToolIdentification = () => {
  // Recoil update
  const [styleByURL, setStyleByURL] = useRecoilState(styleByURLState);
  useEffect(() => {
    setStyleByURL((): Style => {
      return ({
        title: 'ゴースト特定ツール',
        isHeaderTop: true,
        nav: true,
        pageAlert: false,
        button: '',
        side: true,
        back: '/',
      })
    })
  }, []);

  const [identificationMenu, setIdentificationMenu] = useRecoilState(toolIdentificationMenu);
  const evidenceTopAPI = useRecoilValueLoadable(evidenceTopAPIState);
  const cursedItemTopAPI = useRecoilValueLoadable(cursedItemTopAPIState);
  const toolIdentificationItem = useRecoilValueLoadable(toolIdentificationItemState);
  useEffect(() => {
    if (cursedItemTopAPI.state === 'hasValue' &&
      Object.keys(identificationMenu.curse).length === 0) {
      let curseObj: any = {};
      cursedItemTopAPI.contents.forEach((element) => {
        curseObj[element.slug] = false;
      })
      setIdentificationMenu({ ...identificationMenu, ...{ curse: curseObj } });
    }

  }, [cursedItemTopAPI.contents]);
  if (evidenceTopAPI.state === 'hasValue' &&
    cursedItemTopAPI.state === 'hasValue' &&
    toolIdentificationItem.state === 'hasValue') {
    return (
      <SToolIdentification>
        <AlertItem message='このゴースト特定ツールは現在調整中で正しい結果が得られない場合があります。' severity='error' />
        <ToolIdentificationMenu />
        <FieldTool title='証拠' bottom={true} fold={true}>
          <IdentificationEvidenceTable item={evidenceTopAPI.contents} />
        </FieldTool>

        <ToolHightProbabilityGhost />
        <IdentificationGhostTable />


        {toolIdentificationItem.contents.map((item, index) => {
          if (item.curse === null) {
            return (
              <FieldTool
                key={index}
                title={item.name}
                help={item.help ? item.help : ''}
                fold={true}
              >
                <IdentificationTable item={item.item} />
              </FieldTool>
            )
          }
        })}
        {/* <FieldTool title='呪いのアイテムの特徴' fold={true}>
          {toolIdentificationItem.contents.map((item, index) => {
            if (item.curse) {
              return (
                <FieldTool
                  key={index}
                  small={true}
                  title={item.name}
                  help={item.help ? item.help : ''}
                  fold={false}
                >
                  <IdentificationTable item={item.item} />
                </FieldTool>
              )
            }
          })}
        </FieldTool> */}
      </SToolIdentification>
    );

  } else if (evidenceTopAPI.state === 'loading' ||
    cursedItemTopAPI.state === 'loading' ||
    toolIdentificationItem.state === 'loading') {
    return <NowLoading />
  } else {
    return <ErrorPage />
  }
}

const SToolIdentification = styled.div`
  /* background-color: #fffbe8; */
  background-image: linear-gradient(0deg, transparent calc(100% - 1px), #eee calc(100% - 1px)),
                  linear-gradient(90deg, transparent calc(100% - 1px), #eee calc(100% - 1px));
  background-size: 18px 18px;
  /* box-shadow: inset 0px 0px 18px 0px #e0cc66; */
`;