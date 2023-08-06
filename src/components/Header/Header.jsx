import * as React from 'react';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {useState, useEffect, useRef, useContext} from 'react';
import ClickAwayListener from "@mui/base/ClickAwayListener";
import Drawer from "@mui/material/Drawer";
import CreateBuyoutForm from "../CreateBuyoutForm/CreateBuyoutForm";
import { makeStyles } from '@mui/styles';
import UserSettingsDialog from "../UserSettingsDialog/UserSettingsDialog";
import {UserContext} from "../../context/UserContext";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {blackTextButton} from "../../constants/styles";

const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    right: 10,
    top: 50
  }
});

export default function Header() {
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const anchorRef = useRef("Dialog");
  const classes = useStyles();
  const {user} = useContext(UserContext);

  const onOutsideFormClick = (e) => {
    if (e.target.localName === 'body') {
      return;
    }
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }

    if (isUserModalOpen)
      setUserModalOpen(false);
  }

  return (
    <>
      <Toolbar>
        <Stack sx={{width: "100%"}} direction="row" justifyContent="flex-end">
          <Button style={blackTextButton}>ВИДЕООБЗОР</Button>
          <Button style={blackTextButton}>ТАРИФЫ</Button>
          <Divider orientation="vertical" flexItem style={{margin: "0 20px"}}/>
          <Button style={blackTextButton} onClick={() => {setUserModalOpen(true)}}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item sx={{display: "flex", alignItems: "center"}} xs={4}>
                <Box style={{borderRadius: "5px"}} component="img" sx={{height: 40, width: 40, objectFit: "cover"}} src={user.picture} alt={""} />
              </Grid>
              <Grid item xs={8}>
                <Stack>
                  <Typography align="left">
                    {user.name}
                  </Typography>
                  <Typography align="left">
                    {user.phone}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Button>
        </Stack>
        <Dialog
          PaperProps={{ sx: { position: "absolute", top: 15, right: 10, padding: "20px" }}}
          open={isUserModalOpen}
          onClose={() => {setUserModalOpen(false)}}
        >
          <UserSettingsDialog />
        </Dialog>
        {/*<Dialog*/}
        {/*  // classes={{paper: classes.dialog}}*/}
        {/*  open={isUserModalOpen}*/}
        {/*  ref={anchorRef}*/}
        {/*  onClose={setUserModalOpen(false)}*/}
        {/*>*/}
        {/*/!*  <UserSettingsDialog/>*!/*/}
        {/*</Dialog>*/}
      </Toolbar>
      <Divider style={{margin: "auto 20px"}}/>
    </>
  );
}
