import {useContext, useEffect, useState} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {Button} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import ItemsTable from "../ItemsTable/ItemsTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {MyItemsContext} from '../../context/ItemsContext';
import ItemsSearch from '../ItemsSearch/ItemsSearch';
import "./my-items.scss";

import {GET_SEARCH, ADD_ITEM, ARTICLES_ADD_NEW_ARTICLE} from '../../constants/links';

import axios from 'axios';
import {UserContext} from "../../context/UserContext";


export default function MyItems() {
  const {myItems, loadItems, loading} = useContext(MyItemsContext);
  const [value, setValue] = useState(null);
  const {user, hasUser} = useContext(UserContext);

  useEffect(() => {
    if (hasUser())
      loadItems();
  }, [user]);

  const addItem = () => {
    console.log(value);
    if (value && value.article) {
      axios
        .post(ARTICLES_ADD_NEW_ARTICLE(), {
          "article": value.article,
          "photoUrl": value.photoUrl,
          "name": value.name,
          "price": value.price,
          "fullPrice": value.fullPrice
        }, {headers: {'Authorization': `Bearer ${user.accessToken}`}})
        .then(response => {
          loadItems();  // TODO: check
        })
        .catch(error => {
          console.error(error);
        })
    }
  }

  return (
    <Box className={"my-items"}>
      <Grid container spacing={0}>
        {/*<Stack direction="row">*/}
        {/*  <Button>WB</Button>*/}
        {/*  <Button>OZON</Button>*/}
        {/*</Stack>*/}
        <Grid item xs={12}>
          <Typography variant="h4" align="left" gutterBottom>
            <strong>
              Мои товары
            </strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ color: "grey", textAlign: "left" }} gutterBottom>
            Найдите ваш товар по артикулу или по ссылке на сайт Wildberries. Добавьте его в этот список и карточка с вашим товаром останется тут.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ color: "grey", textAlign: "left", marginBottom: "20px" }} gutterBottom>
            Далее вы сможете создавать выкупы, писать отзывы, добавлять в избранное данный товар, а также наблюдать за интересующей вас статистикой.
          </Typography>
        </Grid>
        <Grid container item spacing={2} xs={12}>
          <Grid item xs={10}>
            <ItemsSearch value={value} setValue={setValue} />
          </Grid>
          <Grid item xs={2}>
            <Button
              sx={{
                backgroundColor: "white",
                border: "2px solid #b9a6f5",
                color: "black",
                width: "100%",
                borderRadius: "15px",
                fontSize: "0.8rem",
                fontWeight: "bold",
                height: "100%",
                textTransform: "none"
              }}
              disabled={!value} onClick={() => {addItem()}}>
              <div style={{
                borderRadius: "50%",
                backgroundColor: "#b9a6f5",
                color: "white",
                fontWeight: "100",
                fontSize: "25px",
                width: "30px",
                height: "30px",
                marginRight: "10px",
                position: "relative"
              }}>
                <div style={{borderLeft: "1px solid white", height: "80%", position: "absolute", left: "46%", top: "10%"}}/>
                <div style={{borderLeft: "1px solid white", height: "80%", position: "absolute", left: "46%", top: "10%", transform: "rotate(90deg)"}}/>
              </div>
              Добавить</Button>
          </Grid>
        </Grid>
      </Grid>
      {loading ?
        <>
          <Skeleton variant="rounded" height={90} style={{marginTop: 20 }} />
          <Skeleton variant="rounded" height={90} style={{marginTop: 20 }} />
          <Skeleton variant="rounded" height={90} style={{marginTop: 20 }} />
        </> :
        <ItemsTable items={myItems['items'] || []}/>
      }
    </Box>
  );
}
