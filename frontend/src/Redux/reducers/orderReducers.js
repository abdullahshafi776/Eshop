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
  MY_ORDERS_LIST_RESET,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_SUCCESS,
  ORDERS_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstant";

export const orderCreate = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetails = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const myOrdersList = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_LIST_REQUEST:
      return { loading: true };
    case MY_ORDERS_LIST_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case MY_ORDERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case MY_ORDERS_LIST_RESET:
      return { loading: false, orders: [] };
    default:
      return state;
  }
};

export const OrdersList = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_LIST_REQUEST:
      return { loading: true };
    case ORDERS_LIST_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case ORDERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const OrderDelivered = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return { success: true, loading: false };
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
