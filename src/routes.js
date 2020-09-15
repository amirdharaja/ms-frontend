import React from "react";
import { Route } from "react-router-dom";

import Product from './components/Products';
import Home from "./components/Home";
import CartList from './components/cart/CartList'
import FavouriteList from './components/favourite/FavouriteList'
import Checkout from "./components/Checkout";
import Order from "./components/Order";
import Footer from './containers/Footer';
import Item from './components/Item';
import Setting from './components/Setting';


// import Error404 from "./components/Error404";


const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/category/:slug" component={Product}></Route>
    <Route path="/cart" component={CartList}></Route>
    <Route path="/favourite" component={FavouriteList}></Route>
    <Route path="/checkout" component={Checkout}></Route>
    <Route path="/orders" component={Order}></Route>
    <Route path="/:categoryId/:catgorySlug/:itemId/" component={Item}></Route>
    <Route path="/account/settings" component={Setting}></Route>

    <Route path="*" component={Footer}></Route>
  </div>
);

export default BaseRouter;