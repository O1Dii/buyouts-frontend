import * as React from 'react';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Header() {
  return (
    <>
      <Toolbar>
        <Stack sx={{width: "100%"}} direction="row" justifyContent="flex-end">
          <Button>ВИДЕООБЗОР</Button>
          <Button>ТАРИФЫ</Button>
          <Divider orientation="vertical" flexItem/>
          <Button>Пользователь</Button>
        </Stack>
      </Toolbar>
      <Divider/>
    </>
  );
}
