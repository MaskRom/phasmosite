import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';



export const Account = () => {
  const navigation = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const [ cookies ] = useCookies();
  return (
    <SAccount>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'right top',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={() => {navigation('/config')}}>ページ設定</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Button
        className='ac_toggle'
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <img src={`${process.env.REACT_APP_BASE_PATH}/media/default_user_icon/icon${cookies.icon}.png`} alt="user icon" />
      </Button>
    </SAccount>
  );
}


const SAccount = styled.div`
  /* override */
  .css-1e6y48t-MuiButtonBase-root-MuiButton-root{
    padding: 0;
    color: rgba(0,0,0,0);
  }
  display: grid;
  grid-template-columns:65px 1fr;
  text-align: center;
  align-items: center;
  justify-content: center;
  .ac_toggle {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid rgb(100, 100, 110);
    }
    svg {
      margin-left: 5px;
      color: rgb(100, 100, 110);
      font-size: 15px;
    }
    &:hover{svg {color: rgb(120, 120, 125)}}
  }
`;