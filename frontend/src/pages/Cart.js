import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsTrashFill, BsArrowRight } from "react-icons/bs";
import {
  incQty,
  decQty,
  delproduct,
  emptyCart,
} from "../Redux/actions/cartAction";

export default function Cart({ history }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.Cart);
  const { orderItems } = cart;

  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setSubtotal(
      orderItems.reduce((acc, item) => (acc = acc + item.price * item.qty), 0)
    );
    setShipping(subtotal > 2000 ? 10 : 20);
    setTotal(subtotal + shipping);
  }, [dispatch, orderItems, subtotal, shipping, total]);

  const handlecheckout = (e) => {
    e.preventDefault();
    history.push("/checkout");
  };

  const decreaseQty = (id, qty) => {
    qty > 1 && dispatch(decQty(id));
  };

  return (
    <div>
      <div class="breadcrumbs">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="bread-inner">
                <ul class="bread-list">
                  <li>
                    <div className="d-flex align-items-center">
                      <Link to="index1.html">Home</Link>
                      <BsArrowRight className="mx-2" />
                    </div>
                  </li>
                  <li class="active">
                    <Link to="blog-single.html">Cart</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<!-- End Breadcrumbs --> */}

      {/*<!-- Shopping Cart --> */}
      {orderItems.length === 0 ? (
        <div className="container py-5">
          <div className="text-center">
            <h1>Your Cart is Empty</h1>
          </div>
        </div>
      ) : (
        <div class="shopping-cart section">
          <div class="container">
            <div class="row">
              <div class="col-12">
                {/*<!-- Shopping Summery --> */}
                <div class="table-responsive">
                  <table class="table shopping-summery">
                    <thead>
                      <tr class="main-hading">
                        <th>PRODUCT</th>
                        <th>NAME</th>
                        <th>Size</th>
                        <th>Colour</th>
                        <th class="text-center">UNIT PRICE</th>
                        <th class="text-center">QUANTITY</th>
                        <th class="text-center">TOTAL</th>
                        <th class="text-center">
                          <button
                            className="del_all"
                            data-toggle="tooltip"
                            title="Delete All"
                            onClick={() => dispatch(emptyCart())}
                          >
                            <BsTrashFill />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((p, index) => {
                        return (
                          <tr key={index}>
                            <td class="image text-center" data-title="No">
                              <img src={p.image} alt="#" w />
                            </td>
                            <td
                              class="product-des text-center"
                              data-title="Description"
                            >
                              <p>
                                <Link to="#">{p.name}</Link>
                              </p>
                            </td>
                            <td
                              class="product-des text-center"
                              data-title="Description"
                            >
                              <p>
                                <Link to="#">{p.size}</Link>
                              </p>
                            </td>
                            <td
                              class="product-des text-center"
                              data-title="Description"
                            >
                              <p>
                                <Link to="#">{p.color}</Link>
                              </p>
                            </td>
                            <td class="price text-center" data-title="Price">
                              <span>${p.price}</span>
                            </td>
                            <td class="qty text-center" data-title="Qty">
                              {/*<!-- Input Order --> */}
                              <div class="input-group">
                                <div class="button minus">
                                  <button
                                    type="button"
                                    class="btn btn-primary btn-number"
                                    data-type="minus"
                                    data-field="quant[1]"
                                    onClick={() => decreaseQty(p._id, p.qty)}
                                  >
                                    <AiOutlineMinus />
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  name="quant[1]"
                                  class="input-number"
                                  data-min="1"
                                  data-max="100"
                                  value={p.qty}
                                />
                                <div class="button plus">
                                  <button
                                    type="button"
                                    class="btn btn-primary btn-number"
                                    data-type="plus"
                                    data-field="quant[1]"
                                    onClick={() => dispatch(incQty(p._id))}
                                  >
                                    <AiOutlinePlus />
                                  </button>
                                </div>
                              </div>
                              {/*<!--/ End Input Order --> */}
                            </td>
                            <td
                              class="total-amount text-center"
                              data-title="Total"
                            >
                              <span>${p.price * p.qty}</span>
                            </td>

                            <td class="action text-center" data-title="Remove">
                              <button
                                className="custom_del"
                                onClick={() => dispatch(delproduct(p._id))}
                              >
                                <BsTrashFill />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {/*<!--/ End Shopping Summery --> */}
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                {/*<!-- Total Amount --> */}
                <div class="total-amount">
                  <div class="row">
                    <div class="col-lg-8 col-md-5 col-12">
                      <div class="left">
                        <div class="coupon">
                          <form action="#" target="_blank">
                            <input
                              name="Coupon"
                              placeholder="Enter Your Coupon"
                            />
                            <button class="btn">Apply</button>
                          </form>
                        </div>
                        <div class="checkbox">
                          <label class="checkbox-inline" for="2">
                            <input name="news" id="2" type="checkbox" />{" "}
                            Shipping (+10$)
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-7 col-12">
                      <div class="right">
                        <ul>
                          <li>
                            Cart Subtotal<span>${subtotal}</span>
                          </li>
                          <li>
                            Shipping<span>${shipping}</span>
                          </li>
                          <li class="last">
                            You Pay<span>${total}</span>
                          </li>
                        </ul>
                        <div class="button5">
                          <button onClick={handlecheckout} class="btn btn1">
                            Checkout
                          </button>
                          <Link to="/" class="btn">
                            Continue shopping
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*<!--/ End Total Amount --> */}
              </div>
            </div>
          </div>
        </div>
      )}
      {/*<!--/ End Shopping Cart --> */}
    </div>
  );
}
