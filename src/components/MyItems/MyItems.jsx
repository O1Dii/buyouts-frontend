import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Stack from "@mui/material/Stack";
import {Button} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ItemsTable from "../ItemsTable/ItemsTable";
import Box from "@mui/material/Box";


export default function MyItems() {
  const items = [{
    num: 54320355,
    date: new Date(2023, 5, 13),
    img: 'https://basket-01.wb.ru/vol141/part14145/14145395/images/big/1.jpg',
    name: 'Пижамы женские со штанами',
    price: 2378
  }, {
    num: 12165465,
    date: new Date(2023, 5, 14),
    img: 'https://basket-01.wb.ru/vol141/part14145/14145395/images/big/1.jpg',
    name: 'Пижамы мужские',
    price: 255
  }];

  // const {login: loginState} = useContext(LoggedInContext);
  const [input, setInput] = useState('');

  return (
    <Box>
      <Stack direction="row" justifyContent={"space-between"}>
        <Stack direction="row">
          <Button>WB</Button>
          <Button>OZON</Button>
        </Stack>
        <TextField  xs={{width: "100%"}} placeholder={"Артикул товара в Wildberries или ссылка на товар"} value={input} onChange={(e) => setInput(e.target.value)}/>
        <Button disabled={true}>Добавить</Button>
      </Stack>
      <Divider/>
      <ItemsTable items={items}/>
    </Box>
  );
}
