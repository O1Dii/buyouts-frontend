import React, {Suspense, useContext, useEffect, useState} from "react";
import {Link, Outlet, useNavigate} from 'react-router-dom';

import TextField from "@mui/material/TextField";
import {UserContext} from "../../context/UserContext";
import {accentButtonStyle, buttonStyle} from "../../constants/styles";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {API_ROOT, setApiRoot} from "../../constants/links";

function LoggedInLayout() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [beUrl, setBeUrl] = useState(API_ROOT);
  const {authenticate, user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('here')
    console.log(user)
    if (user.accessToken) {
      navigate("/my-items")
    }
  }, [user, user.accessToken]);

  useEffect(() => {
    setApiRoot(beUrl);
  }, [beUrl])

  return (
    <div className="login">
      <Box component="img" sx={{position: "absolute", height: "100%", width: "100%", top: "0", left: "0", zIndex: "-1"}} src={'https://phonoteka.org/uploads/posts/2022-07/1658235698_9-phonoteka-org-p-chernie-oboi-na-komp-9.jpg'} alt={"Картинка тут)"} />
      <Grid container sx={{height: "100vh"}}>
        <Grid item xs={9} />
        <Grid item sx={{backgroundColor: "white"}} xs={3}>
          <Stack spacing={2} sx={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center", margin: "50px"}}>
            <TextField id="setroot" sx={{width: "100%"}} label="BE URL" variant={"outlined"} value={beUrl} onChange={e => setBeUrl(e.target.value)}/>
            <TextField id="login" sx={{width: "100%"}} label="Номер телефона" variant={"outlined"} value={login} onChange={e => setLogin(e.target.value)}/>
            <TextField id="password" sx={{width: "100%"}} label="Пароль" variant={"outlined"} value={password} onChange={e => setPassword(e.target.value)}/>
            <Button style={accentButtonStyle} onClick={() => {
              authenticate(login, password);
            }}>
              Войти
            </Button>
            <Button sx={{...buttonStyle}} component={Link} to={"https://t.me/test_buyout_bot"}>Telegram Регистрация</Button>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoggedInLayout;
