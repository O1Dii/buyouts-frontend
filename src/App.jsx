import './App.css';
import React, {Suspense} from "react";
import {BrowserRouter as Router, Route, Navigate, Routes} from 'react-router-dom';

import Buyouts from './components/Buyouts/Buyouts';
import MyItems from './components/MyItems/MyItems';
import Delivery from './components/Delivery/Delivery';
import LoggedInLayout from "./components/LoggedInLayout/LoggedInLayout";
import Login from "./components/Login/Login";

import CssBaseline from "@mui/material/CssBaseline";
import UserContextProvider from "./context/UserContext";

function App() {
  return (
    <div className="App">
      <CssBaseline/>

      <Router>
        <UserContextProvider>
          <Routes>
              <Route path="/login" element={<Login />}/>
              <Route element={<LoggedInLayout />}>
                <Route exact path="/" element={<Navigate to="/my-items" replace/>}/>
                <Route path="/my-items" element={<MyItems/>}/>
                <Route path="/buyouts/:action?/:productId?" element={<Buyouts/>}/>
                <Route path="/delivery" element={<Delivery/>}/>
              </Route>
          </Routes>
        </UserContextProvider>
      </Router>
    </div>
  );
}

export default App;
