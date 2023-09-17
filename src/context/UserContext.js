import React, {useState, useEffect} from "react";
import axios from "axios";
import {ARTICLES_GET_ALL_ARTICLES, AUTHENTICATE} from "../constants/links";
import {useNavigate} from "react-router-dom";

export const UserContext = React.createContext({
  user: {},
  setUser: () => {}
});

export default function UserContextProvider(props) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  // requestInfo (status, detail, data)

  const authenticate = (login, password) => {
    setLoading(true);
    axios
      .post(AUTHENTICATE(), {phoneNumber: login, password})
      .then(response => {
        setLoading(false);
        setUser({
          name: "Алексей",
          surname: "Прокопенко",
          phone: "+375447720161",
          picture: "https://basket-01.wb.ru/vol68/part6872/6872871/images/big/1.jpg",
          balance: 150,
          accessToken: response.data.access_token
        })
        console.log(response.data)
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      })
  }

  const context = {
    user,
    authenticate
  }

  return (
    <UserContext.Provider value={{...context}}>
      {props.children}
    </UserContext.Provider>
  )
}