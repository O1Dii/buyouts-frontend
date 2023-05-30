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

export default function DeliveryTable({items}) {
  // pagination
  const pagesCount = 10;
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const productsOnPage = 10;
  // end pagination

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
      <Grid xs={4}>
        {product.address}
      </Grid>
    </Grid>
  ));

  return (
    <div className="buyouts-table">
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={2}>
          <Grid xs={2}>
            Оформлен
          </Grid>
          <Grid xs={2}>
            Статус
          </Grid>
          <Grid xs={4}>
            Наименование
          </Grid>
          <Grid xs={4}>
            Адрес ПВЗ
          </Grid>
        </Grid>
        {data}
      </Box>
      <Pagination urlBase="delivery"/>
    </div>
  );
}
