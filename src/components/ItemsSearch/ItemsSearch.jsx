import {useState} from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";


export default function ItemsSearch({value, setValue}) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const getItemsFromSearch = (searchInput) => {
    setOptions([
      {name: '№124531 abc', article: 124531, photoUrl: 'https://basket-01.wb.ru/vol1/part125/125454/images/c246x328/1.jpg'},
      {name: '№54321 ffsdfg', article: 54321, photoUrl: 'https://basket-01.wb.ru/vol1/part125/125454/images/c246x328/1.jpg'},
      {name: '№8135 hhghgh', article: 8135, photoUrl: 'https://basket-01.wb.ru/vol1/part125/125454/images/c246x328/1.jpg'},
    ]);

    // eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTA4MDkxNzAsImV4cCI6MTY5MDg5NTU3MH0.OZjbOF9T_JTa8a2BlE-kmQUMP7eKzvNUKX3RDaPics4
    fetch(`http://buyoutsapp:8080/api/v1/articles/${inputValue}/get`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NTUiLCJpYXQiOjE2OTEzMzM3MzUsImV4cCI6MTY5MTQyMDEzNX0.-AY-P9NfuJHcy05LUQQLf01P2RMIoA_ldw6tkPvTkHE',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log('залупа')
      });
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
      sx={{width: "100%"}}
      renderInput={(params) => <TextField {...params} label="Артикул товара в Wildberries или ссылка на товар"/>}
    />
  );
}
