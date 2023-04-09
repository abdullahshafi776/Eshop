import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_FILTER_REQUEST,
  PRODUCT_FILTER_SUCCESS,
  PRODUCT_FILTER_FAIL,
  HOT_PRODUCT_REQUEST,
  HOT_PRODUCT_SUCCESS,
  HOT_PRODUCT_FAIL,
} from "../constants/productsConstants";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const filterProducts = (val) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_FILTER_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({
      type: PRODUCT_FILTER_SUCCESS,
      payload: { val, data },
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_FILTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const filterHotItems = () => async (dispatch) => {
  try {
    dispatch({ type: HOT_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({
      type: HOT_PRODUCT_SUCCESS,
      payload: { data },
    });
  } catch (error) {
    dispatch({
      type: HOT_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const delProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    let userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    let userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products`, data, config);

    dispatch({ type: PRODUCT_CREATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    let userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/products/${data.id}`, data, config);

    dispatch({ type: PRODUCT_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
