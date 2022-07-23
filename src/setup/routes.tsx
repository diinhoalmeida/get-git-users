import React from "react";
import { BrowserRouter, Routes as Routed, Route } from "react-router-dom";

import { Home, SearchPage } from '../pages/index';

const Routes = () => {
   return(
       <BrowserRouter>
            <Routed>
                <Route element = { <Home/> }  path="/home" />
                <Route element = { <SearchPage /> }  path="/search-page" />
            </Routed>
       </BrowserRouter>
   )
}

export default Routes;