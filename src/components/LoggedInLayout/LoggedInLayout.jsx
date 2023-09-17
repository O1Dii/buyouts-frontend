import React, {Suspense} from "react";
import {Outlet} from 'react-router-dom';

import LeftMenu from "../../components/LeftMenu/LeftMenu";
import Header from "../../components/Header/Header";

import Box from "@mui/material/Box";
import MyItemsContextProvider from "../../context/ItemsContext";

function LoggedInLayout() {
  return (
    <div className="App">
        <MyItemsContextProvider>
          <Box sx={{display: 'flex'}}>
            <LeftMenu/>
            <Box sx={{width: "100%"}}>
              <Header/>
              <Outlet />
            </Box>
          </Box>
        </MyItemsContextProvider>
    </div>
  );
}

export default LoggedInLayout;
