import {useState, useContext, useEffect} from 'react';

import Box from '@mui/material/Box';
import {Button, IconButton} from "@mui/material";
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
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {MyItemsContext} from '../../context/ItemsContext';
import DeliverySelection from '../DeliverySelection/DeliverySelection';
import ItemsSearch from '../ItemsSearch/ItemsSearch';
import Typography from "@mui/material/Typography";
import {useParams} from "react-router-dom";
import {UserContext} from "../../context/UserContext";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  accentButtonStyle,
  buttonStyle,
  leftSwitchButton,
  rightSwitchButton,
  SelectedSwitchButton
} from "../../constants/styles";
import axios from "axios";
import {ARTICLES_GET_AND_UPDATE_ARTICLE, ARTICLES_GET_ARTICLE, BUYOUTS_CREATE_NEW_BUYOUT} from "../../constants/links";
import Autocomplete from "@mui/material/Autocomplete";


export default function CreateBuyoutForm() {
  const {user} = useContext(UserContext);
  const {myItems, deliveryAddresses, loadItems} = useContext(MyItemsContext);
  const {productId} = useParams();

  const [formData, setFormData] = useState({
    item: null,
    extraItems: [],
    sex: 'F',  // TODO: move to constants
    keyString: '',
    filters: {},
    size: '',
    address: '',
    competitorItems: [],
    humanBehaviorEnable: false,
    plannedTime: null
  });

  console.log(productId)

  useEffect(() => {
    console.log(productId)
    console.log(myItems)
    const items = (myItems.items || []).filter(item => `${item.article}` === productId);
    if (items.length > 0) {
      setFormData({...formData, item: items[0]})
    }
  }, [productId, myItems])

  const [competitorsSelected, setCompetitorsSelected] = useState(false);
  const [extraItemsSelected, setExtraItemsSelected] = useState(false);

  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    if (JSON.stringify(user) !== '{}')
      loadItems()
  }, [user])

  useEffect(() => {
    if (formData.item && formData.item.article) {
      axios
        .post(ARTICLES_GET_AND_UPDATE_ARTICLE(formData.item.article), {
          headers:{
            'Authorization': `Bearer ${user.accessToken}`,
          }
        })
        .then(response => {
          if ([200, 201].contains(response.status)) {
            setFormData({...formData, item: response.data});
          }
        })
    }
  }, [formData.item])

  const createBuyout = () => {
    /*
      "articleId": 0,
      "buyerGender": "string",
      "keyword": "string",
      "size": "string",
      "deliveryAddress": "string",
      "competitorArticles": [
        0
      ],
      "humanBehaviorEnable": true
   */
    axios
      .post(BUYOUTS_CREATE_NEW_BUYOUT(), {
        articleId: formData.item.article,
        buyerGender: formData.sex,
        keyword: formData.keyString,
        size: formData.size,
        deliveryAddress: formData.address,
        competitorArticles: formData.competitorItems.map(item => item.article),
        humanBehaviorEnable: formData.humanBehaviorEnable
      },{
        headers:{
          'Authorization': `Bearer ${user.accessToken}`,
        }
      })
      .then(response => {
        if ([200, 201].contains(response.status)) {
          setFormData({...formData, item: response.data});
        }
      })
  }

  return (
    <Box sx={{margin: "20px"}}>
      <Stack>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Выберите товар</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.item?.article || 0}
            label="Выберите товар"
            onChange={(e) => {
              const item = (myItems.items || []).filter(item => e.target.value === item.article)[0]
              setFormData({...formData, item: item});
            }}
          >
            {(myItems.items || []).map((item) => <MenuItem value={item.article}>{`№${item.article}: ${item.name}`}</MenuItem>)}
          </Select>
        </FormControl>
        {formData.item &&
          <>
          <Paper elevation={3} sx={{width: "100%", marginTop: "20px"}}>
            <Stack direction={"row"}>
              <Box component="img" sx={{height: "150px"}} src={formData.item.photoUrl} alt={`#${formData.item.article}`}/>
              <Box sx={{position: "relative", width: "100%"}}>
                <Typography sx={{margin: "15px 20px auto 20px", textAlign: "left", fontSize: "18px"}}>
                  <strong>
                    {formData.item.name}
                  </strong>
                </Typography>
                <Typography sx={{margin: "15px 20px auto 20px", textAlign: "left"}}>
                  {formData.item.article}
                </Typography>
                <Typography sx={{position: "absolute", bottom: "15px", right: "15px"}}>
                  {formData.item.price} ₽<br/>
                  {formData.item.fullPrice && <><s>{formData.item.fullPrice}</s> ₽</>}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <FormControl sx={{width: "100%", marginTop: "20px"}}>
            <InputLabel id="delivery-address-select-label">Размер</InputLabel>
            <Select
              value={formData.size}
              label={"Размер"}
              labelId="size-select-label"
              onChange={(event) => {
                setFormData({...formData, size: event.target.value});
              }}
            >
              {formData.item.sizes.map(size => <MenuItem value={size}>{size}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControlLabel
            sx={{marginTop: "20px"}}
            control={<Checkbox checked={extraItemsSelected} onChange={(e) => setExtraItemsSelected(e.target.checked)}/>}
            label="Добавить дополнительные товары в выкуп"/>
          {extraItemsSelected &&
            <Paper elevation={3}>
              <Stack>
                {formData.extraItems && formData.extraItems.map(item => (
                  <Stack sx={{margin: "15px"}} direction="row">
                    <Box component="img" sx={{height: 100}} src={item.photoUrl} alt={""} />
                    <Typography sx={{width: "100%", textAlign: "left", margin: "auto 15px"}}>
                      <strong>
                        {item.label}
                      </strong>
                    </Typography>
                    <IconButton sx={{margin: "auto"}} onClick={() => {
                      const filteredItems = formData.extraItems.filter(currentItem => currentItem.article != item.article);
                      setFormData({...formData, extraItems: filteredItems})
                    }}><DeleteIcon /></IconButton>
                  </Stack>
                ))}
                <Box sx={{width: "80%", margin: "15px auto"}}>
                  <ItemsSearch value={null} setValue={
                    (value) => {
                      const doesAlreadyExist = (formData.extraItems || []).filter(item => item.article == value.article).length;
                      if (!doesAlreadyExist)
                        setFormData({...formData, extraItems: [...formData.extraItems, value]})
                    }}/>
                </Box>
              </Stack>
            </Paper>
          }
          </>
        }
        <Stack direction="horizontal" sx={{margin: "20px 0"}}>
          <Typography sx={{margin: "auto 15px auto 0"}}>
            Выкуп от:
          </Typography>
          <ToggleButtonGroup
            value={formData.sex}
            exclusive
            onChange={(e) => {setFormData({...formData, sex: e.target.value})}}
          >
            <ToggleButton sx={{...leftSwitchButton, ...(formData.sex === 'F' && SelectedSwitchButton)}} value="F">Женщины</ToggleButton>
            <ToggleButton sx={{...rightSwitchButton, ...(formData.sex === 'M' && SelectedSwitchButton)}} value="M">Мужчины</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Stack direction={"row"} sx={{width: "100%"}}>
          <TextField
            sx={{width: "100%"}}
            value={formData.keyString}
            onChange={(e) => {setFormData({...formData, keyString: e.target.value})}}
            label="Ключевой запрос"
            variant="outlined"
          />
          {/*<Button disabled={!formData.keyString}>Фильтры</Button>*/}
        </Stack>
        <Paper elevation={3} sx={{margin: "20px 0"}}>
          <Stack>
            {formData.address &&
              <Typography sx={{marginTop: "15px"}}>
                <strong>
                  {formData.address}
                </strong>
              </Typography>
            }
            <Button sx={{...buttonStyle, width: "fit-content", margin: "15px auto"}} onClick={() => setIsMapOpen(true)}>
              {formData.address ? 'Изменить Адрес Доставки' : 'Выбрать Адрес Доставки'}
            </Button>
          </Stack>
        </Paper>
        <FormControlLabel
          control={<Checkbox checked={competitorsSelected} onChange={(e) => setCompetitorsSelected(e.target.checked)}/>}
          label="Добавить товары конкурентов в корзину перед покупкой"/>
        {competitorsSelected &&
          <Paper elevation={3}>
            <Stack>
              {formData.competitorItems && formData.competitorItems.map(item => (
                <Stack sx={{margin: "15px"}} direction="row">
                  <Box component="img" sx={{height: 100}} src={item.photoUrl} alt={""} />
                  <Typography sx={{width: "100%", textAlign: "left", margin: "auto 15px"}}>
                    <strong>
                      {item.label}
                    </strong>
                  </Typography>
                  <IconButton sx={{margin: "auto"}} onClick={() => {
                    const filteredItems = formData.competitorItems.filter(currentItem => currentItem.article != item.article);
                    setFormData({...formData, competitorItems: filteredItems})
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>))}
              <Box sx={{width: "80%", margin: "15px auto"}}>
                <ItemsSearch value={null} setValue={
                  (value) => {
                    const doesAlreadyExist = (formData.competitorItems || []).filter(item => item.article == value.article).length;
                    if (!doesAlreadyExist)
                      setFormData({...formData, competitorItems: [...formData.competitorItems, value]})
                  }}/>
              </Box>
            </Stack>
          </Paper>
        }

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.humanBehaviorEnable}
              onChange={(e) => setFormData({...formData, humanBehaviorEnable: e.target.checked})}
            />
          }
          label="Имитировать человеческое поведение (+100500 ₽)"
        />

        <Button onClick={() => createBuyout()} sx={{...accentButtonStyle, marginTop: "20px"}}>Создать выкуп</Button>
      </Stack>
      <Modal
        open={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DeliverySelection
          deliveryAddresses={deliveryAddresses}
          setAddress={(address) => {
            setFormData({...formData, address: address})
            setIsMapOpen(false)
          }}
        />
      </Modal>
    </Box>
  );
}
