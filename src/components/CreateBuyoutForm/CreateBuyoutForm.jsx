import {useState} from 'react';

import Box from '@mui/material/Box';
import {Button} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

export default function CreateBuyoutForm() {
  const items = [{
    num: 14145395,
    img: 'https://basket-04.wb.ru/vol716/part71606/71606542/images/big/1.jpg',
    name: 'Фитнес резинки Эспандеры для тренировок',
    seller: 'BODY FIT',
    price: 410
  }, {
    num: 14145396,
    img: 'https://basket-01.wb.ru/vol141/part14145/14145395/images/big/1.jpg',
    name: 'Резинки для фитнеса. Эспандер ленточный. Набор для спорта',
    seller: 'FIT FOR ME',
    price: 526
  }];

  const [selectedItem, setSelectedItem] = useState();
  const [competitorsSelected, setCompetitorsSelected] = useState(false);

  // map
  const [isMapOpen, setIsMapOpen] = useState(false);
  const position = [55.755826, 37.6173];

  navigator.geolocation.watchPosition(success, () => {
    console.log('geolocation error')
  });

  function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    // if (marker) {
    //   map.removeLayer(marker);
    //   map.removeLayer(circle);
    // }
    // // Removes any existing marker and circule (new ones about to be set)
    //
    // marker = L.marker([lat, lng]).addTo(map);
    // circle = L.circle([lat, lng], {radius: accuracy}).addTo(map);
    // // Adds marker to the map and a circle for accuracy
    //
    // if (!zoomed) {
    //   zoomed = map.fitBounds(circle.getBounds());
    // }
    // // Set zoom to boundaries of accuracy circle
    //
    // map.setView([lat, lng]);
    // Set map focus to current user position

  }

  return (
    <Box>
      <Stack>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Выберите товар</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedItem?.num || 0}
            label="Выберите товар"
            onChange={(e) => {
              const item = items.filter(item => e.target.value === item.num)[0]
              setSelectedItem(item);
            }}
          >
            {items.map((item) => <MenuItem value={item.num}>{`№${item.num}: ${item.name}`}</MenuItem>)}
          </Select>
        </FormControl>
        {selectedItem && <Paper elevation={3}>
          <Stack direction={"row"}>
            <img src={selectedItem['img']}/>
            <p>{selectedItem['name']}</p>
          </Stack>
        </Paper>}
        <Stack direction={"row"}>
          <p>Выкуп от</p>
          <Button>Женщины</Button>
          <Button>Мужики</Button>
        </Stack>
        <Stack direction={"row"}>
          <TextField id="outlined-basic" label="Ключевой запрос" variant="outlined"/>
          <Button>Фильтры</Button>
        </Stack>
        <Button onClick={() => setIsMapOpen(true)}>Выбрать Адрес Доставки</Button>
        <FormControlLabel
          control={<Checkbox checked={competitorsSelected} onChange={(e) => setCompetitorsSelected(e.target.checked)}/>}
          label="Добавить товары конкурентов в корзину перед покупкой"/>
        {competitorsSelected &&
          <TextField id="outlined-basic" label="Артикул товара в Wildberries или ссылка на товар" variant="outlined"/>}
        <Button>Создать выкуп</Button>
      </Stack>
      <Modal
        open={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <MapContainer style={{height: 800, width: 1236}} center={position} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker onClick={() => {
              console.log('marker clicked')
            }} position={position}>
              <Popup>
                A pretty CSS3 popup. <br/> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Modal>
    </Box>
  );
}
