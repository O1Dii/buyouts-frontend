import './App.css';
import React, {Suspense} from "react";
import {BrowserRouter as Router, Route, Navigate, Routes} from 'react-router-dom';

import Buyouts from './components/Buyouts/Buyouts';
import MyItems from './components/MyItems/MyItems';
import Delivery from './components/Delivery/Delivery';
import LeftMenu from "./components/LeftMenu/LeftMenu";
import Header from "./components/Header/Header";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MyItemsContextProvider from "./context/ItemsContext";

function App() {
  return (
    <div className="App">
      <CssBaseline/>

      <Router>
        <MyItemsContextProvider>
          <Box sx={{display: 'flex'}}>
            <LeftMenu/>
            <Box sx={{width: "100%"}}>
              <Header/>
              <Suspense fallback={<div>nothing here</div>}>
                <Routes>
                  <Route exact path="/" element={<Navigate to="/my-items" replace/>}/>
                  <Route path="/my-items" element={<MyItems/>}/>
                  <Route path="/buyouts/:action?/:productId?" element={<Buyouts/>}/>
                  <Route path="/delivery" element={<Delivery/>}/>
                </Routes>
              </Suspense>
            </Box>
          </Box>
        </MyItemsContextProvider>
      </Router>
    </div>
  );
}

export default App;
