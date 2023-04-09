import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_INCREASE_ITEM,
  CART_DECREASE_ITEM,
  EMPTY_CART,
  CART_SAVE_ORDER_DETAILS,
} from "../constants/cartConstants";

export const Cart = (id, cart) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  let item = {
    _id: data._id,
    name: data.name,
    price: data.price,
    image: data.image,
    ...cart,
  };

  dispatch({
    type: CART_ADD_ITEM,
    payload: item,
  });
  localStorage.setItem(
    "orderItems",
    JSON.stringify(getState().Cart.orderItems)
  );
};

export const incQty = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_INCREASE_ITEM,
    payload: id,
  });
  localStorage.setItem(
    "orderItems",
    JSON.stringify(getState().Cart.orderItems)
  );
};

export const decQty = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_DECREASE_ITEM,
    payload: id,
  });
  localStorage.setItem(
    "orderItems",
    JSON.stringify(getState().Cart.orderItems)
  );
};

export const delproduct = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem(
    "orderItems",
    JSON.stringify(getState().Cart.orderItems)
  );
};

export const emptyCart = () => async (dispatch, getState) => {
  dispatch({
    type: EMPTY_CART,
  });
  localStorage.setItem(
    "orderItems",
    JSON.stringify(getState().Cart.orderItems)
  );
};

export const saveOrderDetails = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_ORDER_DETAILS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data.shippingdetail));
  localStorage.setItem("paymentMethod", JSON.stringify(data.payment));
};
