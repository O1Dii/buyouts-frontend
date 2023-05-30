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

export default function ItemsTable({items}) {
  // pagination
  const pagesCount = 10;
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const productsOnPage = 10;
  // end pagination

  const data = items.map((product) => (
    <Grid container spacing={2}>
      <Grid xs={3}>
        <Stack direction="row">
          <Box component="img" sx={{height: 100}} src={product.img} alt={""} />
          <Stack>
            <Typography>
              {product.num}
            </Typography>
            <Typography>
            {product.date.toString()}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid xs={5}>
        {product.name}
      </Grid>
      <Grid xs={2}>
        {product.price}
      </Grid>
      <Grid xs={2}>
        <Button component={Link} to={"/buyouts/detail/0"}>Выкуп</Button>
      </Grid>
    </Grid>
  ));

  return (
    <div className="buyouts-table">
      <Box sx={{flexGrow: 1}}>
        <Grid container spacing={2}>
          <Grid xs={3}>
            Артикул
          </Grid>
          <Grid xs={5}>
            Наименование
          </Grid>
          <Grid xs={2}>
            Цена
          </Grid>
          <Grid xs={2}/>
        </Grid>
        {data}
      </Box>
      <Pagination urlBase="my-items"/>
    </div>
  );
}
