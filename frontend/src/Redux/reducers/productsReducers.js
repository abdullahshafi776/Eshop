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
  PRODUCT_UPDATE_RESET,
  PRODUCT_DETAILS_RESET,
  PRODUCT_FILTER_REQUEST,
  PRODUCT_FILTER_SUCCESS,
  PRODUCT_FILTER_FAIL,
  HOT_PRODUCT_REQUEST,
  HOT_PRODUCT_SUCCESS,
  HOT_PRODUCT_FAIL,
} from "../constants/productsConstants";

export const Products = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
      };

    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const productFilter = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_FILTER_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_FILTER_SUCCESS:
      const { val, data } = action.payload;
      const filtered = data.filter((e) => e.category === val);
      return { loading: false, product: filtered };
    case PRODUCT_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const hotProducts = (state = { product: [] }, action) => {
  switch (action.type) {
    case HOT_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case HOT_PRODUCT_SUCCESS:
      const { data } = action.payload;
      const filtered = data.filter((e) => e.saletype === "hot");
      return { loading: false, product: filtered };
    case HOT_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDetails = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DETAILS_RESET:
      return { product: [] };
    default:
      return state;
  }
};

export const productDelete = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreate = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productUpdate = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: [] };
    default:
      return state;
  }
};
