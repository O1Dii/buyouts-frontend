import * as React from 'react';
import Grid from "@mui/material/Grid";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {GET_OPERATIONS_HISTORY} from "../../constants/links";
import {UserContext} from "../../context/UserContext";


export default function PaymentOperationsHistory() {
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(GET_OPERATIONS_HISTORY(), {
        headers:{
          'Authorization': `Bearer ${user.accessToken}`,
        }
      })
      .then(response => {
        setLoading(false);
        setOperations(response.data);
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      })
  }, [])

  return (
    <Grid container>
      <Grid xs={8} sx={{display: "flex", justifyContent: "center"}}>
        <strong>Дата</strong>
      </Grid>
      <Grid xs={2} sx={{display: "flex", justifyContent: "center"}}>
        <strong>Операция</strong>
      </Grid>
      <Grid xs={2} sx={{display: "flex", justifyContent: "center"}}>
        <strong>Сумма</strong>
      </Grid>
      {operations.map(operation => (
        <Grid container alignItems="center"
              style={{minHeight: "50px"}}
        >
          <Grid xs={8}>
            {operation['createdOn']}
          </Grid>
          <Grid xs={2} sx={{display: "flex", justifyContent: "center"}}>
            {operation['operation']}
          </Grid>
          <Grid xs={2} sx={{display: "flex", justifyContent: "center"}}>
            {operation['value']}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
