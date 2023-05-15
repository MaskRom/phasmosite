import { toolDifficultyValueState } from '../../../recoil/toolDifficultyState';
import { ImArrowUp2, ImArrowDown2, ImWarning } from 'react-icons/im';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import React from 'react';



type TCustomItem = {
  id: number;
  name: string;
  text: string;
  hide_order: string | null;
  value: Array<{
    value: string;
    magn: number;
    order: number;
  }>
}

export const CustomItem = (props: TCustomItem) => {

  const [
    toolDifficultyValue,
    setToolDifficultyValue] = useRecoilState(toolDifficultyValueState);

  const [now, setNow] = useState(1);
  const [magn, setMagn] = useState(1);

  const [hide, setHide] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();


  const upperOrder = props.value.length;

  useEffect(() => {
    if (toolDifficultyValue[props.id] !== undefined) {
      if (props.hide_order) {
        const hideOrderList: Array<string> = props.hide_order.split(',');
        const hideToId: number = Number(hideOrderList.splice(0, 1));
        if (hideOrderList.includes(String(toolDifficultyValue[hideToId].now))) {
          setHide(true);
        } else setHide(false);
      }
      setNow(toolDifficultyValue[props.id].now)
      setMagn(props.value[toolDifficultyValue[props.id].now - 1].magn)
    }
  }, [toolDifficultyValue]);


  const leftButtonOnClick = () => {
    navigate(location.pathname);
    if (now - 1 > 0) {
      setToolDifficultyValue(() => {
        return (
          {
            ...toolDifficultyValue,
            ...{ [props.id]: { now: now - 1, magn: props.value[now - 2].magn } }
          }
        )
      })
    }
  };
  const rightButtonOnClick = () => {
    navigate(location.pathname);
    if (upperOrder > now) {
      setToolDifficultyValue(() => {
        return (
          {
            ...toolDifficultyValue,
            ...{ [props.id]: { now: now + 1, magn: props.value[now].magn } }
          }
        )
      })
    }
  };

  if (hide) return null;
  return (
    <SCustomItem>
      <div className={
        `s_visual ${magn === 0 ? 'al' :
          magn > 1 ? 'up' :
            magn < 1 && 'dw'}`}
      >
        {magn === 0 ?
          <ImWarning /> :
          magn > 1 ?
            <ImArrowUp2 /> :
            magn < 1 &&
            <ImArrowDown2 />
        }
      </div>

      <div className='s_textfield'>
        <p className='s_name'>{props.name}</p>
        <p className='s_text'>{props.text}</p>
      </div>
      <div className='s_valuefield'>
        <button className='s_value_icon' onClick={leftButtonOnClick}>
          <AiOutlineLeft />
        </button>
        <div className='s_value'>
          <div className='s_name'>{props.value[now - 1].value}</div>
          {/* <div className='s_magn'>x{magn}</div> */}
        </div>
        <button className='s_value_icon' onClick={rightButtonOnClick}>
          <AiOutlineRight />
        </button>
      </div>
    </SCustomItem >
  );
}

const SCustomItem = styled.div`
  user-select: none;
  min-height: 65px;
  margin: 5px 3px;
  display: grid;
  grid-template-columns:18px 4fr 2fr;
  border: #ddd 2px solid;
  .s_visual {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #aaa;
    &.up {background-color: #008d0c;}
    &.dw {background-color: #cc6300;}
    &.al {background-color: #cc3a00;}
  }
  .s_textfield {
    padding: 8px 2px;
    .s_name {
      font-size: 1rem;
      font-weight: bold;
    }
    .s_text {
      font-size: 0.9rem;
    }
  }
  .s_valuefield {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .s_value_icon {
      color: #333;
      font-size: 2em;
      cursor: pointer;
      &:hover {
        color: #999;
      }
    }
    .s_value {
      text-align: center;
      width:100%;
      .s_magn {
        font-size: 0.6em;
      }
      .s_name {
        font-weight: bold;
        font-size: 1.1rem;
      }
      
    }
  }
`;