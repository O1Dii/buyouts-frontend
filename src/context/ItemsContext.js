import React, {useReducer} from "react";
import axios from "axios";

import {itemsInitialState, itemsReducer} from "../reducers/itemsReducer";

export const ItemsContext = React.createContext(itemsInitialState);

export function ItemsContextProvider(props) {
  const [state, dispatch] = useReducer(itemsReducer, itemsInitialState);

  // axios
  //   .post(M2_GET_PAGE, {
  //       search_query: searchQuery,
  //       current_page: currentPage
  //   }, {
  //       headers: {...loginState.csrf_header}
  //   })
  //   .then(response => {
  //       setLoading(false);
  //       setTotalRecords(response.data.data.total_records);
  //       setTotalPages(response.data.data.total_pages);
  //       setAnalyzes(response.data.data.analysis_records)
  //   })
  //   .catch(error => {
  //       if (error.response.status === 401) {
  //           history.push(LOGIN_LINK);
  //       }
  //   })

  return (
    <ItemsContext.Provider value={{state, dispatch}}>
      {props.children}
    </ItemsContext.Provider>
  )
}