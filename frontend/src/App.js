import * as React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "./Reset.css";
import "./Style.css";
import "./responsive.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderDetails from "./pages/OrderDetails";
import ConfirmCheckout from "./pages/ConfirmCheckout";
import UserListScreen from "./pages/UserList";
import EditUser from "./pages/EditUser";
import ProductsListings from "./pages/ProductsListing";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import ScrollToTop from "./components/ScrollToTop";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OrderList from "./pages/OrderList";
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <Header />
          <ScrollToTop />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/confirmcheckout" component={ConfirmCheckout} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/myorders" component={MyOrders} />
            <Route exact path="/product" component={Product} />
            <Route exact path="/orderDetails/:id" component={OrderDetails} />
            <Route exact path="/productdetail/:id" component={ProductDetail} />

            {/* ADMIN */}
            <Route exact path="/userlist" component={UserListScreen} />
            <Route exact path="/edituser/:id" component={EditUser} />
            <Route exact path="/productlist" component={ProductsListings} />
            <Route exact path="/createproduct" component={CreateProduct} />
            <Route exact path="/editproduct/:id" component={EditProduct} />
            <Route exact path="/orderlist" component={OrderList} />
          </Switch>
          <Footer />
        </Provider>
      </Router>
    </>
  );
}

export default App;
