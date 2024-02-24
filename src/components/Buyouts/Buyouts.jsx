import './buyouts.css';

import {useState, useEffect, useRef, useContext} from 'react';

import BuyoutsTable from '../BuyoutsTable/BuyoutsTable';
import CreateBuyoutForm from '../CreateBuyoutForm/CreateBuyoutForm';
import DetailBuyoutForm from '../DetailBuyoutForm/DetailBuyoutForm';
import {Button} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import {Link, useParams, useNavigate} from 'react-router-dom';
import Drawer from "@mui/material/Drawer";
import {BUYOUT_STATUSES_NAMES} from "../../constants/buyouts";
import Typography from "@mui/material/Typography";
import {accentButtonStyle, buttonStyle} from "../../constants/styles";
import axios from "axios";
import {BUYOUTS_GET_ALL_BUYOUTS} from "../../constants/links";
import {UserContext} from "../../context/UserContext";
import Skeleton from "@mui/material/Skeleton";


export default function Buyouts() {
  const filtersInitialState = {
    status: '',
    item: '',
    delivery_address: ''
  }
  const {user, hasUser} = useContext(UserContext);
  const {action, productId} = useParams();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [deliveryAddressList, setDeliveryAddressList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const rightDrawerWidth = "50%";
  const navigate = useNavigate();
  const anchorRef = useRef("Drawer");
  const [filters, setFilters] = useState(filtersInitialState);
  const [reload, setReload] = useState(1);
  const [loading, setLoading] = useState(false);

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
    if(action === 'detail' && !productId) {
      navigate('/buyouts');
    }

    const shouldFormBeOpen = action === 'create' || action === 'detail';
    setIsFormOpen(shouldFormBeOpen);
  }, [action])

  useEffect(() => {
    if (!hasUser())
      return
    setLoading(true);
    axios
      .get(BUYOUTS_GET_ALL_BUYOUTS(), {
        headers:{
          'Authorization': `Bearer ${user.accessToken}`,
        }
      })
      .then(response => {
        const receivedItems = response.data;
        console.log(receivedItems)
        setItems(receivedItems);
        const delivery_address_list = [...new Set(receivedItems.map(item => item.deliveryAddress))];
        delivery_address_list.sort();
        setDeliveryAddressList(delivery_address_list);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      })
  }, [user, reload]);

  useEffect(() => {
    console.log(filters);
    setFilteredItems(items.filter(item => (
      (!filters.status || BUYOUT_STATUSES_NAMES[item.status] === filters.status) &&
      (!filters.item || item.article.name === filters.item) &&
      (!filters.delivery_address || item.deliveryAddress === filters.delivery_address)
    )))
  }, [reload, items, filters])


  console.log(items, filteredItems);

  return (
    <Box style={{margin: "50px 100px"}}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography variant="h4" align="left" gutterBottom>
            <strong>
              Выкупы
            </strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ color: "grey", textAlign: "left" }} gutterBottom>
            Создайте выкуп на добавленный товар, оплатите и ожидайте его поступления.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ color: "grey", textAlign: "left", marginBottom: "20px" }} gutterBottom>
            Далее вы сможете отслеживать статус выкупленного вами товара до доставки в выбранный пункт выдачи.
          </Typography>
        </Grid>
        <Grid item xs={12} style={{display: "flex", justifyContent: "flex-start", marginBottom: "20px"}}>
          <Button style={{...accentButtonStyle, width: "150px"}} onClick={() => navigate("create/0")}>Создать выкуп</Button>
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
                label={"Статус"}
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
                label={"Товар"}
                onChange={(e) => {
                  setFilters({...filters, item: e.target.value})
                }}
              >
                {/*TODO: refactor*/}
                {[...new Set(items.map(item => item.article.name))].map(articleName => <MenuItem value={articleName}>{articleName}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl sx={{minWidth: 150, width: 200}}>
              <InputLabel id="delivery-address-select-label">ПВЗ</InputLabel>
              <Select
                labelId="delivery-address-select-label"
                id="delivery-address-select"
                value={filters.delivery_address}
                label={"ПВЗ"}
                onChange={(e) => {
                  setFilters({...filters, delivery_address: e.target.value})
                }}
              >
                {deliveryAddressList.map(item => <MenuItem value={item}>{item}</MenuItem>)}
              </Select>
            </FormControl>
          </Stack>
        </Grid>
        {loading ?
          <>
            <Skeleton variant="rounded" height={90} style={{marginTop: 20 }} />
            <Skeleton variant="rounded" height={90} style={{marginTop: 20 }} />
            <Skeleton variant="rounded" height={90} style={{marginTop: 20 }} />
          </> :
          <BuyoutsTable items={filteredItems || items}/>
        }
      </Grid>
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
          {action === 'detail' ?
            <DetailBuyoutForm items={items} /> :
            <CreateBuyoutForm reloadBuyoutsPage={() => setReload(reload + 1)} />
          }
        </Drawer>
      </ClickAwayListener>
    </Box>
  );
}
