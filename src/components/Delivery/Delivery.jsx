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
import {BUYOUT_STATUSES} from "../../constants/buyouts";


export default function Delivery() {
  const items = [{
    date: new Date(2023, 5, 13),
    status: BUYOUT_STATUSES.ERROR,
    name: 'Пижамы женские со штанами',
    address: "Какой-то ПВЗ"
  }, {
    date: new Date(2023, 5, 14),
    status: BUYOUT_STATUSES.ERROR,
    name: 'Пижамы мужские',
    address: "Какой-то ПВЗ 2"
  }];
  const delivery_address_list = [...new Set(items.map(item => item.address))];
  delivery_address_list.sort();

  const [filters, setFilters] = useState({
    status: '',
    item: '',
    delivery_address: ''
  });

  return (
    <Box>
      <Stack direction="row" justifyContent={"space-between"}>
        <Stack direction="row">
          <Button>Reload</Button>
          <Button>Clear</Button>
        </Stack>
        <Stack direction="row">
          <Button>WB</Button>
          <Button>OZON</Button>
        </Stack>
        <FormControl xs={{minWidth: 150}}>
          <InputLabel id="status-select-label">Статус</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={filters.status}
            onChange={(e) => {
              setFilters({...filters, status: e.target.value})
            }}
          >
            {Object.entries(BUYOUT_STATUSES).map(([key, value]) => (<MenuItem value={key}>{value}</MenuItem>))}
          </Select>
        </FormControl>
        <FormControl xs={{minWidth: 150}}>
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
        <FormControl xs={{minWidth: 150}}>
          <InputLabel id="delivery-address-select-label">ПВЗ</InputLabel>
          <Select
            labelId="delivery-address-select-label"
            id="delivery-address-select"
            value={filters.delivery_address}
            onChange={(e) => {
              setFilters({...filters, delivery_address: e.target.value})
            }}
          >
            {delivery_address_list.map(item => <MenuItem value={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>
        <Stack direction="row">
          <Button>Список</Button>
          <Button>Архив</Button>
        </Stack>
      </Stack>
      <Divider/>
      <DeliveryTable items={items}/>
    </Box>
  );
}
