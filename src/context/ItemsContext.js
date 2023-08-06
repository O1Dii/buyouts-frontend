import React, {useState, useEffect} from "react";
import axios from 'axios';
import {GET_ITEMS} from '../constants/links';

export const MyItemsContext = React.createContext({
  myItems: {items: [], errorMessage: ''},
  deliveryAddresses: [],
  setMyItems: () => {},
  loadItems: () => {}
});

export default function MyItemsContextProvider(props) {
  const [myItems, setMyItems] = useState({});
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadItems = () => {
    setMyItems({
      items: [{
        num: 54320355,
        date: new Date(2023, 5, 13),
        img: 'https://basket-01.wb.ru/vol141/part14145/14145395/images/big/1.jpg',
        name: 'Пижамы женские со штанами',
        price: 2378
      }, {
        num: 12165465,
        date: new Date(2023, 5, 14),
        img: 'https://basket-01.wb.ru/vol141/part14145/14145395/images/big/1.jpg',
        name: 'Пижамы мужские',
        price: 255
      }],
      errorMessage: ""
    })
    // axios
    //   .get(GET_ITEMS, {
    //     headers:{
    //       'Bearer': '123',
    //       'Access-Control-Allow-Origin': '*'
    //     }
    //   })
    //   .then(response => {
    //     console.log('хер')
    //       setMyItems({items: response.data, errorMessage: ''});  // TODO: check
    //       // idea is that myItems will contain error messages and error status so that state updates only once
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     console.log('залупа')
    //       if (error.response.status === 401) {
    //           setMyItems(error.response.data);
    //       }
    //   })

    fetch('http://localhost:8080/api/v1/articles', {
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
        console.log(error)
        console.log('залупа')
      });
  }

  useEffect(() => {
    setDeliveryAddresses([{
      position: [55.755834, 37.6154],
      name: 'ул. Николы Тесла 16'
    }, {
      position: [55.755810, 37.6179],
      name: 'ул. Николы Тесла 1a'
    }])
  }, [])

  const context = {
    myItems,
    deliveryAddresses,
    setMyItems,
    loadItems,
    loading
  }

  return (
    <MyItemsContext.Provider value={{...context}}>
      {props.children}
    </MyItemsContext.Provider>
  )
}