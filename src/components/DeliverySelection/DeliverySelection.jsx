import {useState, useContext, useEffect} from 'react';

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
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import {ItemsContext, MyItemsContext} from '../../context/ItemsContext';
import Autocomplete from "@mui/material/Autocomplete";
import {buttonStyle} from "../../constants/styles";
import Typography from "@mui/material/Typography";


export default function DeliverySelection({deliveryAddresses, setAddress}) {
  // map
  const minskPosition = [55.755826, 37.6173];

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [view, setView] = useState(minskPosition);

  function ViewSetterComponent({view}) {
    const map = useMap();

    useEffect(() => {map.setView(view, 13)}, [view])
    return null
  }

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
    <Stack direction="horizontal" sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    }}>
      <MapContainer style={{height: 800, width: 800}} center={minskPosition} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ViewSetterComponent view={view} />
        {deliveryAddresses.map(address => (
          <Marker position={address.position}>
            <Popup>
              <Stack>
                <Typography>
                  {address.name}
                </Typography>
                <Button style={{...buttonStyle}} onClick={() => {setAddress(address.name)}}>Выбрать</Button>
              </Stack>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setView(newValue.pos)
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={deliveryAddresses.map(address => ({label: address.name, pos: address.position}))}
        sx={{width: 300, marginLeft: "20px"}}
        renderInput={(params) => <TextField {...params} label="Поиск по адресу ПВЗ"/>}
      />
    </Stack>
  );
}
