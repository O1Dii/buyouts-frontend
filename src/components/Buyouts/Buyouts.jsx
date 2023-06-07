import './buyouts.css';

import {useState, useEffect, useRef} from 'react';

import BuyoutsTable from '../BuyoutsTable/BuyoutsTable';
import CreateBuyoutForm from '../CreateBuyoutForm/CreateBuyoutForm';
import {Button} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Drawer from "@mui/material/Drawer";
import {BUYOUT_STATUSES} from "../../constants/buyouts";

export default function Buyouts() {
  const filtersInitialState = {
    status: '',
    item: '',
    delivery_address: ''
  }
  const {action, productId} = useParams();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [deliveryAddressList, setDeliveryAddressList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const rightDrawerWidth = 1200;
  const navigate = useNavigate();
  const anchorRef = useRef("Drawer");
  const [filters, setFilters] = useState(filtersInitialState);
  const [reload, setReload] = useState(1);

  const onOutsideFormClick = (e) => {
    if (e.target.localName === 'body') {
      return;
    }
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }

    if (isFormOpen)
      navigate("/buyouts");
  }

  useEffect(() => {
    setIsFormOpen(action === 'detail');
  }, [action])

  useEffect(() => {
    const receivedItems = [{
      date: new Date(2023, 5, 13),
      status: BUYOUT_STATUSES.AWAITING_PAYMENT,
      name: 'Пижамы женские со штанами',
      price: 2378,
      address: 'г. Москва, м Китай-город'
    }, {
      date: new Date(2023, 5, 14),
      status: BUYOUT_STATUSES.AWAITING_PAYMENT,
      name: 'Пижамы мужские',
      price: 255,
      address: 'г. Москва, м Китай-город'
    }]
    setItems(receivedItems);
    const delivery_address_list = [...new Set(receivedItems.map(item => item.address))];
    delivery_address_list.sort();
    setDeliveryAddressList(delivery_address_list)
    /*
    axios
      .post(GET_SEARCH, {}, {})
      .then(response => {
        setOptions(response.data.options);  // TODO: check
      })
      .catch(error => {
        console.error(error);
      })
     */
  }, [reload]);

  useEffect(() => {
    console.log(filters);
    setFilteredItems(items.filter(item => (
      (!filters.status || item.status === filters.status) &&
      (!filters.item || item.name === filters.item) &&
      (!filters.delivery_address || item.address === filters.delivery_address)
    )))
  }, [reload, items, filters])

  console.log(items, filteredItems, deliveryAddressList);

  return (
    <>
      <Box>
        <Button><Link to={'detail/0'}>Создать выкуп</Link></Button>
      </Box>
      <Box>
        <Stack direction="row" justifyContent={"space-between"}>
          <Stack direction="row">
            <Button onClick={() => {setReload(reload + 1)}}>Reload</Button>
            <Button onClick={() => {setFilters(filtersInitialState)}}>Clear</Button>
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
              {Object.values(BUYOUT_STATUSES).map(value => (<MenuItem value={value}>{value}</MenuItem>))}
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
              {deliveryAddressList.map(item => <MenuItem value={item}>{item}</MenuItem>)}
            </Select>
          </FormControl>
          <Stack direction="row">
            <Button>Список</Button>
            <Button>Архив</Button>
          </Stack>
        </Stack>
        <Divider/>
        <BuyoutsTable items={filteredItems || items}/>
      </Box>
      <ClickAwayListener onClickAway={onOutsideFormClick}>
        <Drawer
          sx={{
            position: 'absolute',
            width: isFormOpen ? rightDrawerWidth : 0,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: isFormOpen ? rightDrawerWidth : 0,
            },
          }}
          variant="persistent"
          anchor="right"
          open={isFormOpen}
          ref={anchorRef}
        >
          <CreateBuyoutForm/>
        </Drawer>
      </ClickAwayListener>
    </>
  );
}
