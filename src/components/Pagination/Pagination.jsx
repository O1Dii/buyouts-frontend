import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {Pagination as MuiPagination} from '@mui/material';
import {Button} from "@mui/material";
import {Link, MemoryRouter, Route, Routes, useLocation} from 'react-router-dom';
import PaginationItem from '@mui/material/PaginationItem';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select, {SelectChangeEvent} from '@mui/material/Select';

export default function Pagination({urlBase}) {
  // pagination
  const pagesCount = 10;
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const productsOnPage = 10;
  // end pagination

  return (
    <Stack direction="row">
      <MuiPagination
        page={page}
        count={pagesCount}
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            // TODO: move to constants
            to={`/${urlBase}/${item.page === 1 ? '' : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
      <p>На странице</p>
      <FormControl>
        <Select
          labelId="products-on-page-label"
          id="products-on-page-select"
          value={productsOnPage}
          onChange={() => {
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
