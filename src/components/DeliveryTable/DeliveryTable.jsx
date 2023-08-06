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
    <Grid container alignItems="center" spacing={2} style={{minHeight: "90px"}}>
      <Grid xs={2}>
        {product.date.toLocaleString()}
      </Grid>
      <Grid xs={2}>
        <strong>
          {product.status}
        </strong>
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
    <div className="buyouts-table" style={{width: "100%"}}>
      <Box sx={{flexGrow: 1}}>
        <Grid sx={{padding: "25px 0"}} container spacing={2}>
          <Grid xs={2}>
            <strong>
              Оформлен
            </strong>
          </Grid>
          <Grid xs={2}>
            <strong>
              Статус
            </strong>
          </Grid>
          <Grid xs={4}>
            <strong>
              Наименование
            </strong>
          </Grid>
          <Grid xs={4}>
            <strong>
              Адрес ПВЗ
            </strong>
          </Grid>
        </Grid>
        {data}
      </Box>
      <Pagination urlBase="delivery"/>
    </div>
  );
}
