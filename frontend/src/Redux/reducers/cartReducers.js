import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_INCREASE_ITEM,
  CART_DECREASE_ITEM,
  EMPTY_CART,
  CART_SAVE_ORDER_DETAILS,
} from "../constants/cartConstants";

const initialCartState = localStorage.getItem("orderItems")
  ? JSON.parse(localStorage.getItem("orderItems"))
  : [];

const initialShippingState = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : [];

const paymentMethod = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : [];

const Cart = (
  state = {
    orderItems: initialCartState,
    shippingAddress: initialShippingState,
    paymentMethod: paymentMethod,
  },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      return {
        ...state,
        orderItems: [item, ...state.orderItems],
      };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        orderItems: [
          ...state.orderItems.filter((item) => {
            return item._id !== action.payload;
          }),
        ],
      };

    case CART_INCREASE_ITEM:
      return {
        ...state,
        orderItems: [
          ...state.orderItems.map((item) =>
            item._id === action.payload
              ? {
                  ...item,
                  qty: item.qty + 1,
                }
              : item
          ),
        ],
      };
    case CART_DECREASE_ITEM:
      return {
        ...state,
        orderItems: [
          ...state.orderItems.map((item) =>
            item._id === action.payload
              ? {
                  ...item,
                  qty: item.qty - 1,
                }
              : item
          ),
        ],
      };
    case EMPTY_CART:
      return {
        ...state,
        orderItems: [],
      };
    case CART_SAVE_ORDER_DETAILS:
      return {
        ...state,
        shippingAddress: action.payload.shippingdetail,
        paymentMethod: action.payload.payment,
      };
    default:
      return state;
  }
};
export default Cart;
