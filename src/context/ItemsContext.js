import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import {ARTICLES_GET_ALL_ARTICLES} from '../constants/links';
import {UserContext} from "../context/UserContext";

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
  const {user} = useContext(UserContext);

  const loadItems = () => {
    setLoading(true)
    axios
      .get(ARTICLES_GET_ALL_ARTICLES(), {
        headers:{
          'Authorization': `Bearer ${user.accessToken}`,
        }
      })
      .then(response => {
        setMyItems({items: response.data, errorMessage: ''});  // TODO: check
        // idea is that myItems will contain error messages and error status so that state updates only once
        setLoading(false)
      })
      .catch(error => {
        setMyItems({items: [], errorMessage: 'An error occurred while loading items'});
      })
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