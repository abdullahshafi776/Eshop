import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../components/Loader";
import { createOrder } from "../Redux/actions/orderActions";

const ConfirmCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  const Cart = useSelector((state) => state.Cart);
  const { shippingAddress, orderItems, paymentMethod } = Cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error } = orderCreate;

  useEffect(() => {
    setSubtotal(
      orderItems.reduce((acc, item) => (acc = acc + item.price * item.qty), 0)
    );
    setShipping(subtotal > 2000 ? 10 : 20);
    setTotal(subtotal + shipping);
  }, [dispatch, orderItems, subtotal, shipping, total]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: orderItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: subtotal,
        shippingPrice: shipping,
        totalPrice: total,
      })
    );
  };

  useEffect(() => {
    if (success) {
      history.push(`/myorders`);
    }
  }, [dispatch, history, success]);

  return loading ? (
    <Loader />
  ) : error ? (
    <div class="alert alert-danger mt-3" role="alert">
      {error}
    </div>
  ) : (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2 className="total_head mb-2">Shipping Details</h2>
              <Row>
                <Col>
                  <p>
                    <strong>Name: </strong>
                    {shippingAddress.name}
                  </p>
                </Col>
                <Col>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${shippingAddress.email}`}>
                      {shippingAddress.email}
                    </a>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    <strong>Address:</strong>
                    {shippingAddress.address}
                  </p>
                </Col>
                <Col>
                  <p>
                    <strong>Phone:</strong>
                    {shippingAddress.phone}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    <strong>City:</strong>
                    {shippingAddress.city}
                  </p>
                </Col>
                <Col>
                  <p>
                    <strong>Country:</strong>
                    {shippingAddress.country}
                  </p>
                </Col>
              </Row>

              <p>
                <strong>Payment Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="total_head ">Order Items</h2>
              {orderItems.length === 0 ? (
                <p>No orders yet</p>
              ) : (
                <ListGroup variant="flush">
                  {orderItems.map((item, index) => (
                    <ListGroup.Item key={index} className="border-0">
                      <Row className="align-items-center">
                        <Col md={1}>
                          <Image src={item.image} fluid rounded />
                        </Col>
                        <Col>{item.name}</Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3 className="total_head">CART TOTALS</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Subtotal</Col>
                <Col>${subtotal}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${shipping}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${total}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <Form onSubmit={handleSubmit}>
            <Button type="submit" className="btn btn1 btn-light btn-block my-3">
              Place an order
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmCheckout;
