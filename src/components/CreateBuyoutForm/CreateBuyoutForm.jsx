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


export default function CreateBuyoutForm() {
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
        <FormControl>
          <InputLabel id="demo-simple-select-label">Выберите товар</InputLabel>
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
        {formData.item &&
          <>
          <Paper elevation={3} sx={{width: "80%"}}>
            <Stack direction={"row"}>
              <Box component="img" sx={{height: 100}} src={formData.item.img} alt={""}/>
              <Stack>
                <Typography>
                  {`#${formData.item.num} ${formData.item.name}`}
                </Typography>
                <Typography>
                  {formData.item.price}
                </Typography>
              </Stack>
            </Stack>
          </Paper>

          <FormControlLabel
            control={<Checkbox checked={extraItemsSelected} onChange={(e) => setExtraItemsSelected(e.target.checked)}/>}
            label="Добавить дополнительные товары в выкуп"/>
          {extraItemsSelected &&
            <Stack>
              {formData.extraItems && formData.extraItems.map(item => (
                <Stack direction="row">
                  <Box component="img" sx={{height: 100}} src={item.img} alt={""} />
                  {item.label}
                  <Button onClick={() => {
                    const filteredItems = formData.extraItems.filter(currentItem => currentItem.num != item.num);
                    setFormData({...formData, extraItems: filteredItems})
                  }}>Remove</Button>
                </Stack>))}
              <ItemsSearch value={null} setValue={
                (value) => {
                  const doesAlreadyExist = (formData.extraItems || []).filter(item => item.num == value.num).length;
                  if (!doesAlreadyExist)
                    setFormData({...formData, extraItems: [...formData.extraItems, value]})
                }}/>
            </Stack>
          }
          </>
        }
        <Box>
          <Typography>
            Выкуп от:
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={formData.sex}
            exclusive
            onChange={(e) => {setFormData({...formData, sex: e.target.value})}}
          >
            <ToggleButton value="F">Женщины</ToggleButton>
            <ToggleButton value="M">Мужчины</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Stack direction={"row"}>
          <TextField
            value={formData.keyString}
            onChange={(e) => {setFormData({...formData, keyString: e.target.value})}}
            label="Ключевой запрос"
            variant="outlined"
          />
          <Button disabled={!formData.keyString}>Фильтры</Button>
        </Stack>
        <Stack>
          {formData.address &&
            <Stack>{formData.address}</Stack>
          }
          <Button onClick={() => setIsMapOpen(true)}>
            {formData.address ? 'Изменить Адрес Доставки' : 'Выбрать Адрес Доставки'}
          </Button>
        </Stack>
        <FormControlLabel
          control={<Checkbox checked={competitorsSelected} onChange={(e) => setCompetitorsSelected(e.target.checked)}/>}
          label="Добавить товары конкурентов в корзину перед покупкой"/>
        {competitorsSelected &&
          <Stack>
            {formData.competitorItems && formData.competitorItems.map(item => (
              <Stack direction="row">
                <Box component="img" sx={{height: 100}} src={item.img} alt={""} />
                {item.label}
                <Button onClick={() => {
                  const filteredItems = formData.competitorItems.filter(currentItem => currentItem.num != item.num);
                  setFormData({...formData, competitorItems: filteredItems})
                }}>Remove</Button>
              </Stack>))}
            <ItemsSearch value={null} setValue={
              (value) => {
                const doesAlreadyExist = (formData.competitorItems || []).filter(item => item.num == value.num).length;
                if (!doesAlreadyExist)
                  setFormData({...formData, competitorItems: [...formData.competitorItems, value]})
              }}/>
          </Stack>
        }
        <Button>Создать выкуп</Button>
      </Stack>
      <Modal
        open={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DeliverySelection
          deliveryAddresses={deliveryAddresses}
          setAddress={(address) => {
            setFormData({...formData, address: address})
            setIsMapOpen(false)
          }}
        />
      </Modal>
    </Box>
  );
}
