import {useState} from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";


export default function ItemsSearch({value, setValue}) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const getItemsFromSearch = (searchInput) => {
    setOptions([
      {label: '№124531 abc', num: 124531, img: 'https://basket-01.wb.ru/vol1/part125/125454/images/c246x328/1.jpg'},
      {label: '№54321 ffsdfg', num: 54321, img: 'https://basket-01.wb.ru/vol1/part125/125454/images/c246x328/1.jpg'},
      {label: '№8135 hhghgh', num: 8135, img: 'https://basket-01.wb.ru/vol1/part125/125454/images/c246x328/1.jpg'},
    ]);
    /*
    axios
      .post(GET_SEARCH, {}, {})
      .then(response => {
        setOptions(response.data.options);  // TODO: check
      })
      .catch(error => {
        console.error(error);
      })
     */
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
      options={options}
      filterOptions={x => x}
      sx={{width: 300}}
      renderInput={(params) => <TextField {...params} label="Артикул товара в Wildberries или ссылка на товар"/>}
    />
  );
}
