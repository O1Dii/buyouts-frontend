import {useContext, useState} from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {ARTICLES_GET_ARTICLE} from "../../constants/links";
import {UserContext} from "../../context/UserContext";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";


export default function ItemsSearch({value, setValue}) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const getItemsFromSearch = (searchInput) => {
    setLoading(true)
    axios
      .get(ARTICLES_GET_ARTICLE(searchInput), {
        headers:{
          'Authorization': `Bearer ${user.accessToken}`,
        }
      })
      .then(response => {
        console.log(response);
        setOptions([{label: response.data.name, ...response.data}]);
        setLoading(false);
        // {"article":58464968,"photoUrl":"https://basket-04.wb.ru/vol584/part58464/58464968/images/big/1.jpg",
        // "name":"Кроп топ под пиджак","price":"735","fullPrice":"2100","sizes":["42 42","44 44","46 46","48 48","50 50","52 52"]}
        // {name: '№124531 abc', article: 124531, photoUrl: 'https://basket-01.wb.ru/vol1/part125/125454/images/c246x328/1.jpg'}
      })
      .catch(error => {
        setLoading(false);
      })
  };

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        getItemsFromSearch(newInputValue);
      }}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={option.photoUrl}
            alt=""
          />
          №{option.article} {option.label}
        </Box>
      )}
      options={options}
      filterOptions={x => x}
      sx={{width: "100%"}}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Артикул товара в Wildberries"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
