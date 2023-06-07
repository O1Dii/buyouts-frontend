import {useContext, useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import {Button} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import ItemsTable from "../ItemsTable/ItemsTable";
import Box from "@mui/material/Box";
import {MyItemsContext} from '../../context/ItemsContext';
import ItemsSearch from '../ItemsSearch/ItemsSearch';

import {GET_SEARCH, ADD_ITEM} from '../../constants/links';

import axios from 'axios';


export default function MyItems() {
  const {myItems, loadItems} = useContext(MyItemsContext);
  const [value, setValue] = useState(null);

  useEffect(() => {
    loadItems()
  }, []);

  const addItem = () => {
    if (value) {
      /*
  axios
    .post(ADD_ITEM, {item_id: value}, {})
    .then(response => {
      loadItems();  // TODO: check
    })
    .catch(error => {
      console.error(error);
    })
   */
    }
  }

  return (
    <Box>
      <Stack direction="row" justifyContent={"space-between"}>
        <Stack direction="row">
          <Button>WB</Button>
          <Button>OZON</Button>
        </Stack>
        <ItemsSearch value={value} setValue={setValue} />
        <Button disabled={!value} onClick={() => {addItem()}}>Добавить</Button>
      </Stack>
      <Divider/>
      <ItemsTable items={myItems['items'] || []}/>
    </Box>
  );
}
