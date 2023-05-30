import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {Button} from "@mui/material";
import { Link, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import Pagination from '../Pagination/Pagination';

export default function BuyoutsTable({items}) {
  const pagesCount = 10;
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const productsOnPage = 10;

  const data = items.map((product) => (
    <Grid container spacing={2}>
          <Grid xs={2}>
            {product.date.toString()}
          </Grid>
          <Grid xs={2}>
            {product.status}
          </Grid>
          <Grid xs={4}>
            {product.name}
          </Grid>
          <Grid xs={1}>
            {product.price}
          </Grid>
          <Grid xs={2}>
            {product.address}
          </Grid>
          <Grid xs={1}>
            <Button>Options</Button>
          </Grid>
        </Grid>
  ));

  return (
    <div className="buyouts-table">
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={2}>
          <Grid xs={2}>
            Дата
          </Grid>
          <Grid xs={2}>
            Статус
          </Grid>
          <Grid xs={4}>
            Наименование
          </Grid>
          <Grid xs={1}>
            Цена
          </Grid>
          <Grid xs={2}>
            Адрес
          </Grid>
          <Grid xs={1}>

          </Grid>
        </Grid>
        {data}
      </Box>
      <Pagination urlBase="buyouts"/>
    </div>
  );
}
