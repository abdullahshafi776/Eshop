import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  Products,
  productDetails,
  productDelete,
  productCreate,
  productUpdate,
  productFilter,
  hotProducts,
} from "./Redux/reducers/productsReducers";
import Cart from "./Redux/reducers/cartReducers";
import {
  userLogin,
  userRegister,
  updateUserprofile,
  userDetail,
  userList,
  userDelete,
  userUpdate,
} from "./Redux/reducers/userReducers";
import { combineReducers } from "redux";
import {
  orderCreate,
  orderDetails,
  myOrdersList,
  OrdersList,
  OrderDelivered,
} from "./Redux/reducers/orderReducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  Products,
  productDetails,
  Cart,
  userLogin,
  userRegister,
  userDetail,
  updateUserprofile,
  userList,
  orderCreate,
  orderDetails,
  myOrdersList,
  OrdersList,
  OrderDelivered,
  userDelete,
  userUpdate,
  productDelete,
  productCreate,
  productUpdate,
  productFilter,
  hotProducts,
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
