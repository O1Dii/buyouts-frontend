import {useState, useContext, useEffect} from 'react';

import Box from '@mui/material/Box';
import {Button} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {MyItemsContext} from '../../context/ItemsContext';
import DeliverySelection from '../DeliverySelection/DeliverySelection';
import ItemsSearch from '../ItemsSearch/ItemsSearch';
import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";
import {BUYOUT_STATUSES} from "../../constants/buyouts";
import axios from "axios";
import {
  BUYOUTS_CHANGE_BUYOUT_STATUS_TO_CHECK_PAYMENT,
  BUYOUTS_GET_ALL_BUYOUTS,
  BUYOUTS_GET_BUYOUT_STATUS,
  BUYOUTS_GET_PAYMENT_QR
} from "../../constants/links";
import {UserContext} from "../../context/UserContext";
import {accentButtonStyle} from "../../constants/styles";
import HomeIcon from '@mui/icons-material/Home';
import KeyIcon from '@mui/icons-material/Key';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import TransgenderIcon from '@mui/icons-material/Transgender';


export default function DetailBuyoutForm({ items }) {
  const {loadItems} = useContext(MyItemsContext);
  const {user} = useContext(UserContext);
  const {productId} = useParams();
  const [currentItem, setCurrentItem] = useState({});

  console.log(productId)
  console.log(items)

  const pollAndUpdateStatus = (item) => {
    axios
      .get(BUYOUTS_GET_BUYOUT_STATUS(item.id), {
        headers:{
          'Authorization': `Bearer ${user.accessToken}`,
        }
      })
      .then(response => {
        if (response.data['buyoutStatus'] && response.data['buyoutStatus'] !== item.status) {
          setCurrentItem({...item, status: response.data['buyoutStatus']})
        }
      })
  }

  const checkPayment = () => {
    axios
      .post(BUYOUTS_CHANGE_BUYOUT_STATUS_TO_CHECK_PAYMENT(currentItem.id), {}, {
        headers:{
          'Authorization': `Bearer ${user.accessToken}`,
        }
      })
      .then(response => {
        // TODO: check status here, because the response was empty
        setCurrentItem({...currentItem, status: response.data['buyoutStatus']})
      })
  }

  useEffect(() => {
    if (currentItem.id && currentItem.status !== BUYOUT_STATUSES.WAITING_PAYMENT) {
      if (currentItem.status !== BUYOUT_STATUSES.CHECK_PAYMENT) {
        pollAndUpdateStatus(currentItem)
      }
      const intervalId = setInterval(() => {
        pollAndUpdateStatus(currentItem)
      }, 10000)

      return () => clearInterval(intervalId);
    }
  }, [currentItem, user.accessToken])

  useEffect(() => {
    const filteredItems = (items || []).filter(item => `${item.id}` === productId);
    if (filteredItems.length > 0) {
      setCurrentItem(filteredItems[0])
    }
  }, [productId, items])

  // useEffect(() => {loadItems()}, [])

  useEffect(() => {
    if (currentItem.status === BUYOUT_STATUSES.WAITING_PAYMENT) {
      axios
        .get(BUYOUTS_GET_PAYMENT_QR(currentItem.id), {
          headers:{
            'Authorization': `Bearer ${user.accessToken}`,
          }
        })
        .then(response => {
          console.log(response)
        })
    }
  }, [currentItem])

  return (
    <Box sx={{margin: "20px"}}>
      <Stack>
        <Paper elevation={3} sx={{width: "100%", marginTop: "20px"}}>
          <Stack direction={"row"}>
            <Box component="img" sx={{height: "150px"}} src={currentItem.article?.photoUrl} alt={`#${currentItem.article?.article}`}/>
            <Box sx={{position: "relative", width: "100%"}}>
              <Typography sx={{margin: "15px 20px auto 20px", textAlign: "left", fontSize: "18px"}}>
                <strong>
                  {currentItem.article?.name}
                </strong>
              </Typography>
              <Typography sx={{margin: "15px 20px auto 20px", textAlign: "left"}}>
                {currentItem.article?.article}
              </Typography>
              <Typography sx={{position: "absolute", bottom: "15px", right: "15px"}}>
                {currentItem.article?.price} ₽<br/>
                {currentItem.article?.fullPrice && <><s>{currentItem.article?.fullPrice}</s> ₽</>}
              </Typography>
            </Box>
          </Stack>
        </Paper>
        <Stack sx={{display: "flex", alignItems: "flex-start", margin: "20px 0"}}>
          <Stack direction="row" sx={{display: "flex", alignItems: "center"}}>
            <HomeIcon sx={{backgroundColor: "grey", color: "white", borderRadius: "100%", height: "30px", width: "30px", padding: "5px", margin: "auto 10px"}}/>
            <Typography sx={{margin: "10px 0"}}>
              Адрес доставки: {currentItem.deliveryAddress}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{display: "flex", alignItems: "center"}}>
            <KeyIcon sx={{backgroundColor: "grey", color: "white", borderRadius: "100%", height: "30px", width: "30px", padding: "5px", margin: "auto 10px"}}/>
            <Typography sx={{margin: "10px 0"}}>
              Ключевое слово: {currentItem.keyword}
            </Typography>
          </Stack>
          {currentItem.size &&
          <Stack direction="row" sx={{display: "flex", alignItems: "center"}}>
            <FormatSizeIcon sx={{backgroundColor: "grey", color: "white", borderRadius: "100%", height: "30px", width: "30px", padding: "5px", margin: "auto 10px"}}/>
            <Typography sx={{margin: "10px 0"}}>
              Размер: {currentItem.size}
            </Typography>
          </Stack>
          }
          {currentItem.buyerGender &&
          <Stack direction="row" sx={{display: "flex", alignItems: "center"}}>
            <TransgenderIcon sx={{backgroundColor: "grey", color: "white", borderRadius: "100%", height: "30px", width: "30px", padding: "5px", margin: "auto 10px"}}/>
            <Typography sx={{margin: "10px 0"}}>
              Выкуп от: {currentItem.buyerGender}
            </Typography>
          </Stack>
          }
        </Stack>
        <Box>
          {currentItem.status === BUYOUT_STATUSES.CREATED &&
            <Alert severity="info" icon={false} sx={{textAlign: "start", display: "flex", position: "relative"}}>
              <div style={{marginBottom: "5px"}}>
                Ваш запрос обрабатывается, пожалуйста подождите<br/>(обычно это занимает 60-90 сек)
              </div>
              <LinearProgress style={{position: "absolute", right: "16px", left: "16px"}}/>
            </Alert>
          }
          {currentItem.status === BUYOUT_STATUSES.WAITING_PAYMENT &&
            <>

              <Button sx={{...accentButtonStyle}} onClick={() => checkPayment()}>Я оплатил</Button>
            </>
          }
        </Box>
      </Stack>
    </Box>
  );
}
