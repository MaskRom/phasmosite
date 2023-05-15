import MSnackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { IoCloseSharp } from 'react-icons/io5';
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import Slide, { SlideProps } from '@mui/material/Slide';
import React from "react";



export const snackbarState = atom({
  key: 'snackbarState',
  default: {
    massage: '',
    clickfunc: () => { },
  },
});


export type TSnackbar = {
  massage: string;
  clickfunc: any;
}

type TransitionProps = Omit<SlideProps, 'direction'>;
function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}


export const Snackbar = () => {

  const snack = useRecoilValue(snackbarState);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [snackopen, setSnackOpen] = React.useState(false);

  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);
  const handleClick = (Transition: React.ComponentType<TransitionProps>) => () => {
    setTransition(() => Transition);
    setSnackOpen(true);
  };
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };
  React.useEffect(() => {
    setSnackbar((): TSnackbar => {
      return ({
        massage: '',
        clickfunc: handleClick(TransitionUp),
      })
    })
  }, [])
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <IoCloseSharp />
      </IconButton>
    </React.Fragment>
  );
  return (
    <MSnackbar
      open={snackopen}
      autoHideDuration={3000}
      onClose={handleClose}
      message={snack.massage}
      action={action}
    />
  )
}