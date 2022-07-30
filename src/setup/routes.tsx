import React from "react";
import { BrowserRouter, Routes as Routed, Route } from "react-router-dom";
import BasicAlerts from "../components/alert-popup";

import { Home, SearchPage } from '../pages/index';

const Routes = () => {
   return(  
       <BrowserRouter>
            <Routed>
                <Route element = { <Home /> } path="/" />
                <Route element = { <SearchPage /> }  path="/search-page" />
            </Routed>
       </BrowserRouter>
   )
}

export default Routes;