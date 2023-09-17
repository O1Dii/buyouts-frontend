import * as React from 'react';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {useState, useEffect, useRef, useContext} from 'react';
import ClickAwayListener from "@mui/base/ClickAwayListener";
import Grid from "@mui/material/Grid";
import CreateBuyoutForm from "../CreateBuyoutForm/CreateBuyoutForm";
import Box from "@mui/material/Box";
import {MyItemsContext} from "../../context/ItemsContext";
import {UserContext} from "../../context/UserContext";
import {accentButtonStyle, buttonStyle} from "../../constants/styles";

export default function UserSettingsDialog() {
  const {user, logout} = useContext(UserContext);

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item sx={{display: "flex", alignItems: "center"}} xs={3}>
        <Box component="img" sx={{height: 90, width: 90, objectFit: "cover", borderRadius: "15px"}} src={user.picture} alt={""} />
      </Grid>
      <Grid item xs={9}>
        <Stack>
          <Typography align="left">
            {user.name} {user.surname}
          </Typography>
          <Typography align="left">
            {user.phone}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography align="left">
          <strong>
            {`Баланс: ${user.balance} ₽`}
          </strong>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Button style={accentButtonStyle}>
          Пополнить
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button style={buttonStyle}>
          История операций
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={logout} style={buttonStyle}>
          Выход
        </Button>
      </Grid>
    </Grid>
  );
}
