import React from 'react';
// Type
import { TAlert } from '../../../types/TyAPI';

import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { IoClose } from 'react-icons/io5';



export const AlertItem = (props: TAlert) => {
  const [open, setOpen] = React.useState(true);
  // string型だとエラー
  const severityAnyType: any = props.severity ? props.severity : 'warning';
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity={ severityAnyType }
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <IoClose />
            </IconButton>
          }
        >
          { props.message }
        </Alert>
      </Collapse>
    </Box>
  )
};
