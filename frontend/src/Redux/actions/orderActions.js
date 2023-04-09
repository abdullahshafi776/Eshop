import axios from "axios";
import { EMPTY_CART } from "../constants/cartConstants";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  MY_ORDERS_LIST_REQUEST,
  MY_ORDERS_LIST_SUCCESS,
  MY_ORDERS_LIST_FAIL,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_SUCCESS,
  ORDERS_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../constants/orderConstant";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    let user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({ type: EMPTY_CART });
    localStorage.setItem(
      "orderItems",
      JSON.stringify(getState().Cart.orderItems)
    );
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    let user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyOrderList = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_LIST_REQUEST });

    let user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: MY_ORDERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderList = () => async (dispatch) => {
  try {
    dispatch({ type: ORDERS_LIST_REQUEST });

    let user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: ORDERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const DeliverOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });

    let user = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    await axios.put(`/api/orders/${order._id}/delivered`, {}, config);

    dispatch({ type: ORDER_DELIVER_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
