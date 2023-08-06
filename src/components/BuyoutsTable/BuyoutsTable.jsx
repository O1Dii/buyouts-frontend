import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {Button} from "@mui/material";
import {Link, MemoryRouter, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {buttonStyle} from "../../constants/styles";
import "../Buyouts/buyouts.css";

import Pagination from '../Pagination/Pagination';

export default function BuyoutsTable({items}) {
  const pagesCount = 10;
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const productsOnPage = 10;

  const data = items.map((product) => (
    <Grid container alignItems="center" spacing={2} className="item-row" style={{minHeight: "90px", cursor: "pointer"}} onClick={() => {navigate(`/buyouts/detail/${product.id}`)}}>
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
      <Grid xs={1}>
        <strong>
          {product.price} ₽
        </strong>
      </Grid>
      <Grid xs={2}>
        {product.address}
      </Grid>
      <Grid xs={1}>
        <div>
          <Button style={buttonStyle}>:</Button>
        </div>
      </Grid>
    </Grid>
  ));

  return (
    <div className="buyouts-table" style={{width: "100%"}}>
      <Box sx={{flexGrow: 1}}>
        <Grid sx={{padding: "25px 0"}} container spacing={2}>
          <Grid xs={2}>
            <strong>
              Дата
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
          <Grid xs={1}>
            <strong>
              Цена
            </strong>
          </Grid>
          <Grid xs={2}>
            <strong>
              Адрес
            </strong>
          </Grid>
          <Grid xs={1} />
        </Grid>
        {data}
      </Box>
      <Pagination urlBase="buyouts"/>
    </div>
  );
}
