import React from "react";
import Home from "../container/Home";
import Shop from "../container/Shop";
import Contact from "../container/Contact";
import AdminDashboard from "../container/AdminDashboard";
import Notfound404 from "../container/Notfound404";
import MyCart from "../container/MyCart";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductDetails from "../container/ProductDetails";
export default function AppRouter() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />{" "}
        <Route path="/Home" exact component={Home} />{" "}
        <Route path="/Shop" exact component={Shop} />{" "}
        <Route path="/Contact" exact component={Contact} />{" "}
        <Route path="/AdminDashboard" exact component={AdminDashboard} />{" "}
        <Route path="/shop/item/" component={ProductDetails} />{" "}
        <Route path="/MyCart" component={MyCart} />{" "}
        {/* <Route path="/404" component={Notfound404} />{" "} */}{" "}
        {/* <Redirect from="*" to="/404" /> */}{" "}
      </Switch>{" "}
      <Footer />
    </>
  );
}
