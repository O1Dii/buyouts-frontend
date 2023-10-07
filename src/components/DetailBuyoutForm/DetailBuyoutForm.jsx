import {useState, useContext, useEffect} from 'react';

import Box from '@mui/material/Box';
import {Button} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
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


export default function DetailBuyoutForm({ items }) {
  const {loadItems} = useContext(MyItemsContext);
  const {productId} = useParams();
  const [currentItem, setCurrentItem] = useState({});

  console.log(productId)
  console.log(items)

  useEffect(() => {
    console.log(productId)
    console.log(items)
    const filteredItems = (items || []).filter(item => `${item.id}` === productId);
    if (filteredItems.length > 0) {
      setCurrentItem(filteredItems[0])
    }
  }, [productId, items])

  useEffect(() => {loadItems()}, [])

  return (
    <Box>
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
        <Stack>
          <Typography>
            Адрес доставки: {currentItem.deliveryAddress}
          </Typography>
          <Typography>
            Ключевое слово: {currentItem.keyword}
          </Typography>
          {currentItem.size &&
          <Typography>
            Размер: {currentItem.size}
          </Typography>
          }
          {currentItem.buyerGender &&
          <Typography>
            Выкуп от: {currentItem.buyerGender}
          </Typography>
          }
        </Stack>
        <Box>
          {currentItem.status === BUYOUT_STATUSES.CREATED &&
            <p>Loading...</p>
          }
        </Box>
      </Stack>
    </Box>
  );
}
