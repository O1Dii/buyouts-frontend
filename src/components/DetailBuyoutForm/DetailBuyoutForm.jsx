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


export default function DetailBuyoutForm() {
  const {myItems, deliveryAddresses, loadItems} = useContext(MyItemsContext);
  const {productId} = useParams();

  const [formData, setFormData] = useState({
    item: null,
    extraItems: [],
    sex: 'F',  // TODO: move to constants
    keyString: '',
    filters: {},
    address: '',
    competitorItems: [],
    plannedTime: null
  });

  console.log(productId)

  useEffect(() => {
    console.log(productId)
    console.log(myItems)
    const items = (myItems.items || []).filter(item => `${item.num}` === productId);
    if (items.length > 0) {
      setFormData({...formData, item: items[0]})
    }
  }, [productId, myItems])

  const [competitorsSelected, setCompetitorsSelected] = useState(false);
  const [extraItemsSelected, setExtraItemsSelected] = useState(false);

  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {loadItems()}, [])

  return (
    <Box>
      <Stack>
        <Typography>
          <strong>
            {productId}
          </strong>
        </Typography>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Выбранный вами товар</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.item?.num || 0}
            label="Выберите товар"
            onChange={(e) => {
              const item = (myItems.items || []).filter(item => e.target.value === item.num)[0]
              setFormData({...formData, item: item});
            }}
          >
            {(myItems.items || []).map((item) => <MenuItem value={item.num}>{`№${item.num}: ${item.name}`}</MenuItem>)}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
}
