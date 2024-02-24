import * as React from 'react';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {useState, useEffect, useRef, useContext} from 'react';
import { makeStyles } from '@mui/styles';
import UserSettingsDialog from "../UserSettingsDialog/UserSettingsDialog";
import {UserContext} from "../../context/UserContext";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {blackTextButton} from "../../constants/styles";
import Modal from "../Modal/Modal";
import PaymentOperationsHistory from "../PaymentOperationsHistory/PaymentOperationsHistory";
import {CircularProgress} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {TOPUP_BALANCE} from "../../constants/links";
import {useNavigate} from "react-router-dom";

export default function Header() {
  const prices = [
    ['Выкуп', '75.00₽', '75.00₽'],
    ['Добавить товар конкурента при выкупе', '5.00₽', '5.00₽'],
    ['Добавить фильтры при выкупе', '10.00₽', '10.00₽'],
    ['Прогон аккаунта при выкупе', '20.00₽', '20.00₽'],
    ['Одноразовый аккаунт при выкупе', '40.00₽', '40.00₽'],
    ['Групповой выкуп', '60.00₽', '60.00₽']
  ]

  console.log('header render')

  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isTutorVideoModalOpen, setIsTutorVideoModalOpen] = useState(false);
  const [isPricesModalOpen, setIsPricesModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaymentHistoryModalOpen, setIsPaymentHistoryModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const {user} = useContext(UserContext);

  const topupBalance = () => {
    axios
      .post(TOPUP_BALANCE(), {
        value: paymentAmount,
        idempotenceKey: `${Math.round(Math.random() * 10000000000)}`,
        returnUrl: window.location.href
      }, {
        headers:{
          'Authorization': `Bearer ${user.accessToken}`,
        }
      })
      .then(response => {
        window.open(response.data['confirmationUrl'], "_blank", "noreferrer");
      })
      .catch(error => {
        // setLoading(false);
        console.error(error);
      })
  }

  return (
    <>
      <Toolbar>
        <Stack sx={{width: "100%"}} direction="row" justifyContent="flex-end">
          <Button style={blackTextButton} onClick={() => setIsTutorVideoModalOpen(true)}>ВИДЕООБЗОР</Button>
          <Button style={blackTextButton} onClick={() => setIsPricesModalOpen(true)}>ТАРИФЫ</Button>
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
          <UserSettingsDialog onTopupClick={() => setIsPaymentModalOpen(true)} onHistoryClick={() => setIsPaymentHistoryModalOpen(true)} />
        </Dialog>

        {/* Video Tutor Modal */}
        <Modal
          open={isTutorVideoModalOpen}
          onClose={() => setIsTutorVideoModalOpen(false)}
          title={"Видеообзор"}
        >
          <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=u0uwavGsvTHVxwgt" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </Modal>

        {/* Prices Modal */}
        <Modal
          open={isPricesModalOpen}
          onClose={() => setIsPricesModalOpen(false)}
          title={"Тарифы на услуги"}
        >
          <Grid container>
            <Grid xs={8} sx={{display: "flex", justifyContent: "center"}}>
              <strong>Услуга</strong>
            </Grid>
            <Grid xs={2} sx={{display: "flex", justifyContent: "center"}}>
              <strong>Цена</strong>
            </Grid>
            <Grid xs={2} sx={{display: "flex", justifyContent: "center"}}>
              <strong>Со скидкой</strong>
            </Grid>
            {prices.map(item => (
              <Grid container alignItems="center"
                    style={{minHeight: "50px"}}
              >
                <Grid xs={8}>
                  {item[0]}
                </Grid>
                <Grid xs={2} sx={{display: "flex", justifyContent: "center"}}>
                  {item[1]}
                </Grid>
                <Grid xs={2} sx={{display: "flex", justifyContent: "center"}}>
                  {item[2]}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Modal>

        {/* Topup Balance Modal */}
        <Modal
          open={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          title={"Пополнение баланса"}
        >
          <TextField
            sx={{width: "100%"}}
            type="number"
            value={paymentAmount}
            onChange={(e) => {setPaymentAmount(e.target.value)}}
            label="Сумма оплаты"
            variant="outlined"
          />
          <Button onClick={() => topupBalance()}>Оплатить</Button>
        </Modal>

        {/* Payments History Modal */}
        <Modal
          open={isPaymentHistoryModalOpen}
          onClose={() => setIsPaymentHistoryModalOpen(false)}
          title={"История операций"}
        >
          <PaymentOperationsHistory />
        </Modal>
      </Toolbar>
      <Divider style={{margin: "auto 20px"}}/>
    </>
  );
}
