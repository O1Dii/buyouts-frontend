import React, {useState, useEffect} from "react";
import axios from "axios";
import {ARTICLES_GET_ALL_ARTICLES, AUTHENTICATE} from "../constants/links";
import {useNavigate} from "react-router-dom";

export const UserContext = React.createContext({
  user: {},
  loading: false,
  logout: () => {},
  setUser: () => {}
});

export default function UserContextProvider(props) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // requestInfo (status, detail, data)

  useEffect(() => {
    const localStorageUserInfo = localStorage.getItem('user');
    if (localStorageUserInfo) {
      setUser(JSON.parse(localStorageUserInfo));
    } else {
      logout();
    }
  }, [])

  const authenticate = (login, password) => {
    setLoading(true);
    axios
      .post(AUTHENTICATE(), {phoneNumber: login, password})
      .then(response => {
        setLoading(false);
        const userObject = {
          name: "Алексей",
          surname: "Прокопенко",
          phone: "+375447720161",
          picture: "https://basket-01.wb.ru/vol68/part6872/6872871/images/big/1.jpg",
          balance: 150,
          accessToken: response.data.access_token
        }
        setUser(userObject);
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(userObject))
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      })
  }

  const logout = () => {
    localStorage.removeItem('user');
    setUser({});
    navigate("/login");
  }

  const hasUser = () => {
    return JSON.stringify(user) !== '{}'
  }

  const context = {
    user,
    loading,
    logout,
    authenticate,
    hasUser
  }

  return (
    <UserContext.Provider value={{...context}}>
      {props.children}
    </UserContext.Provider>
  )
}