import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { saveOrderDetails } from "../Redux/actions/cartAction";

export default function Checkout({ history }) {
  const dispatch = useDispatch();
  const [subtotal, setSubtotal] = useState(0);
  const [payment, setPayment] = useState("PayPal");
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  const { userInfo } = useSelector((state) => state.userLogin);
  const Cart = useSelector((state) => state.Cart);
  const { shippingAddress, orderItems } = Cart;

  const [shippingdetail, setShippingdetail] = useState({
    name: shippingAddress.name,
    email: shippingAddress.email,
    phone: shippingAddress.phone,
    postalCode: shippingAddress.postalCode,
    city: shippingAddress.city,
    country: shippingAddress.country,
    address: shippingAddress.address,
  });
  const onvaluechange = (e) => {
    setShippingdetail({ ...shippingdetail, [e.target.name]: e.target.value });
  };
  const { name, email, phone, postalCode, city, country, address } =
    shippingdetail;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      setSubtotal(
        orderItems.reduce((acc, item) => (acc = acc + item.price * item.qty), 0)
      );
      setShipping(subtotal > 2000 ? 10 : 20);
      setTotal(subtotal + shipping);
    }
  }, [userInfo, history, orderItems, subtotal, shipping, total]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveOrderDetails({ shippingdetail, payment }));
    history.push(`/confirmcheckout`);
  };

  return (
    <React.Fragment>
      {/* <!-- Breadcrumbs -->*/}
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bread-inner">
                <ul className="bread-list">
                  <li>
                    <Link to="index1.html">
                      Home<i className="ti-arrow-right"></i>
                    </Link>
                  </li>
                  <li className="active">
                    <Link to="blog-single.html">Checkout</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Breadcrumbs -->*/}

      {/* <!-- Start Checkout -->*/}
      <section className="shop checkout section">
        <div className="container">
          <Form className="form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-8 col-12">
                <div className="checkout-form">
                  <h2>Make Your Checkout Here</h2>
                  <p>Please register in order to checkout more quickly</p>
                  {/* <!-- Form -->*/}
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Name<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder=""
                          required="required"
                          value={name}
                          onChange={(e) => onvaluechange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Email<span>*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder=""
                          required="required"
                          value={email}
                          onChange={(e) => onvaluechange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Phone<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="phone"
                          placeholder=""
                          required="required"
                          value={phone}
                          onChange={(e) => onvaluechange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Postal Code<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          placeholder=""
                          required="required"
                          value={postalCode}
                          onChange={(e) => onvaluechange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          City<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          placeholder=""
                          required="required"
                          value={city}
                          onChange={(e) => onvaluechange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label>
                          Country<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="country"
                          placeholder=""
                          required="required"
                          value={country}
                          onChange={(e) => onvaluechange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>
                          Address<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          placeholder=""
                          required="required"
                          value={address}
                          onChange={(e) => onvaluechange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <!--/ End Form -->*/}
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="order-details">
                  {/* <!-- Order Widget -->*/}
                  <div className="single-widget">
                    <h2>CART TOTALS</h2>
                    <div className="content">
                      <ul>
                        <li>
                          Sub Total<span>${subtotal}</span>
                        </li>
                        <li>
                          (+) Shipping<span>${shipping}</span>
                        </li>
                        <li className="last">
                          Total
                          <span>${total}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* <!--/ End Order Widget -->*/}
                  {/* <!-- Order Widget -->*/}
                  <div className="single-widget">
                    <h2>Payments</h2>
                    <div className="content">
                      <div className="checkbox">
                        <Form.Group>
                          <Form.Check
                            type="radio"
                            name="payment"
                            id="default-radio"
                            value="PayPal"
                            label="PayPal"
                            onChange={(e) => setPayment(e.target.value)}
                          ></Form.Check>
                          <Form.Check
                            type="radio"
                            name="payment"
                            id="default-radio"
                            value="Payoneer"
                            label="Payoneer"
                            onChange={(e) => setPayment(e.target.value)}
                          ></Form.Check>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                  {/* <!--/ End Order Widget -->*/}
                  {/* <!-- Payment Method Widget -->*/}
                  <div className="single-widget payement">
                    <div className="content">
                      <img src="images/payment-method.png" alt="#" />
                    </div>
                  </div>
                  {/* <!--/ End Payment Method Widget -->*/}
                  {/* <!-- Button Widget -->*/}
                  <div className="single-widget get-button">
                    <div className="content">
                      <div className="button">
                        <button type="submit" className="btn btn1">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <!--/ End Button Widget -->*/}
                </div>
              </div>
            </div>
          </Form>
        </div>
      </section>
      {/* <!--/ End Checkout -->*/}
    </React.Fragment>
  );
}
