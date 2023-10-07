import {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Stack from "@mui/material/Stack";
import {Button} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import DeliveryTable from "../DeliveryTable/DeliveryTable";
import Box from "@mui/material/Box";
import {BUYOUT_STATUSES_NAMES} from "../../constants/buyouts";
import {buttonStyle} from "../../constants/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


export default function Delivery() {
  const filtersInitialState = {
    status: '',
    item: '',
    delivery_address: ''
  }

  const [filters, setFilters] = useState(filtersInitialState);
  const [reload, setReload] = useState(1);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [deliveryAddressList, setDeliveryAddressList] = useState([]);

  useEffect(() => {
    const receivedItems = [{
      date: new Date(2023, 5, 13),
      status: BUYOUT_STATUSES_NAMES.ERROR,
      name: 'Пижамы женские со штанами',
      address: "Какой-то ПВЗ"
    }, {
      date: new Date(2023, 5, 14),
      status: BUYOUT_STATUSES_NAMES.ERROR,
      name: 'Пижамы мужские',
      address: "Какой-то ПВЗ 2"
    }];
    setItems(receivedItems);
    const delivery_address_list = [...new Set(receivedItems.map(item => item.address))];
    delivery_address_list.sort();
    setDeliveryAddressList(delivery_address_list)
  }, [reload]);

  useEffect(() => {
    console.log(filters);
    console.log(items);
    setFilteredItems(items.filter(item => (
      (!filters.status || item.status === filters.status) &&
      (!filters.item || item.name === filters.item) &&
      (!filters.delivery_address || item.address === filters.delivery_address)
    )))
  }, [reload, items, filters])

  return (
    <Box style={{margin: "50px 100px"}}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography variant="h4" align="left" gutterBottom>
            <strong>
              Доставки
            </strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ color: "grey", textAlign: "left" }} gutterBottom>
            Наблюдайте за изменением статуса доставки вашего выкупа.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ color: "grey", textAlign: "left", marginBottom: "20px" }} gutterBottom>
            Далее вы сможете забрать товар по месту доставки и на этом процесс выкупа будет завершён.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent={"space-between"}>
            <Button style={{...buttonStyle, width: "100px"}} onClick={() => {setReload(reload + 1)}}>Обновить</Button>
            <Button style={{...buttonStyle, width: "100px"}} onClick={() => {setFilters(filtersInitialState)}}>Очистить</Button>
            <FormControl sx={{minWidth: 150, width: 200}}>
              <InputLabel id="status-select-label">Статус</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={filters.status}
                onChange={(e) => {
                  setFilters({...filters, status: e.target.value})
                }}
              >
                {Object.values(BUYOUT_STATUSES_NAMES).map(value => (<MenuItem value={value}>{value}</MenuItem>))}
              </Select>
            </FormControl>
            <FormControl sx={{minWidth: 150, width: 200}}>
              <InputLabel id="item-select-label">Товар</InputLabel>
              <Select
                labelId="item-select-label"
                id="item-select"
                value={filters.item}
                onChange={(e) => {
                  setFilters({...filters, item: e.target.value})
                }}
              >
                {items.map(item => <MenuItem value={item.name}>{item.name}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl sx={{minWidth: 150, width: 200}}>
              <InputLabel id="delivery-address-select-label">ПВЗ</InputLabel>
              <Select
                labelId="delivery-address-select-label"
                id="delivery-address-select"
                value={filters.delivery_address}
                onChange={(e) => {
                  setFilters({...filters, delivery_address: e.target.value})
                }}
              >
                {deliveryAddressList.map(item => <MenuItem value={item}>{item}</MenuItem>)}
              </Select>
            </FormControl>
          </Stack>
        </Grid>
        <DeliveryTable items={filteredItems}/>
      </Grid>
    </Box>
  );
}
