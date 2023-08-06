import React, {useState, useEffect} from "react";

export const UserContext = React.createContext({
  user: {},
  setUser: () => {}
});

export default function UserContextProvider(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    // browser cache here
    setUser({
      name: "Алексей",
      surname: "Прокопенко",
      phone: "+375447720161",
      picture: "https://basket-01.wb.ru/vol68/part6872/6872871/images/big/1.jpg",
      balance: 150
    })

    // fetch('http://localhost:8080/api/v1/buyouts', {
    //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'no-cors', // no-cors, *cors, same-origin
    //     headers: {
    //       'Bearer': '123',
    //       'Access-Control-Allow-Origin': '*'
    //     },
    //     referrerPolicy: 'no-referrer', // no-referrer, *client
    //   })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log('залупа')
    //   });
  }, [])

  const context = {
    user
  }

  return (
    <UserContext.Provider value={{...context}}>
      {props.children}
    </UserContext.Provider>
  )
}