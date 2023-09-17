import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {Button} from "@mui/material";
import {Link, MemoryRouter, Route, Routes, useLocation} from 'react-router-dom';
import PaginationItem from '@mui/material/PaginationItem';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select, {SelectChangeEvent} from '@mui/material/Select';

import Pagination from '../Pagination/Pagination';
import {accentButtonStyle} from "../../constants/styles";
import {useEffect, useState} from "react";

export default function ItemsTable({items}) {
  // pagination
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const [productsOnPage, setProductsOnPage] = useState(10);
  // end pagination

  const [data, setData] = useState([]);

  console.log(items);

  useEffect(() => {
    const currentData = items.map((product) => (
      <Grid container alignItems="center" spacing={2}>
        <Grid sx={{display: "flex", alignItems: "center"}} xs={2}>
          <Box component="img" sx={{height: 90, width: 90, objectFit: "cover"}} src={product.photoUrl} alt={""} />
        </Grid>
        <Grid xs={2}>
          <strong>
            {product.article}
          </strong>
        </Grid>
        <Grid xs={3}>
          {product.name}
        </Grid>
        <Grid xs={2}>
          вчера, 19:44
        </Grid>
        <Grid xs={1}>
          <strong>
            {product.price} ₽<br/>
            {product.fullPrice && <><s>{product.fullPrice}</s> ₽</>}
          </strong>
        </Grid>
        <Grid xs={2}>
          <Button sx={accentButtonStyle} component={Link} to={`/buyouts/create/${product.article}`}>Выкуп</Button>
        </Grid>
      </Grid>
    ))

    if(currentData && currentData.length) {
      setData(currentData);
    } else {
      setData(
        <Box sx={{backgroundColor: "#dbd1fd", padding: "15px", borderRadius: "15px"}}>
          <strong>
            Нет добавленных товаров
          </strong>
        </Box>
      )
    }
  }, [items]);

  return (
    <div className="buyouts-table">
      <Box sx={{flexGrow: 1}}>
        <Grid sx={{padding: "25px 0"}} container spacing={2}>
          <Grid xs={2} />
          <Grid xs={2}>
            <strong>
              Артикул
            </strong>
          </Grid>
          <Grid xs={3}>
            <strong>
              Наименование
            </strong>
          </Grid>
          <Grid xs={2}>
            <strong>
              Добавлено
            </strong>
          </Grid>
          <Grid xs={1}>
            <strong>
              Цена
            </strong>
          </Grid>
          <Grid xs={2}/>
        </Grid>
        {data}
      </Box>
      {items &&
      <Pagination urlBase="my-items" itemsLen={items.length} productsOnPage={productsOnPage} setProductsOnPage={setProductsOnPage}/>
      }
    </div>
  );
}
