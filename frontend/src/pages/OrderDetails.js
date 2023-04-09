import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, DeliverOrder } from "../Redux/actions/orderActions";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { ORDER_DELIVER_RESET } from "../Redux/constants/orderConstant";
import { Loader } from "../components/Loader";

const OrderDetails = ({ match }) => {
  const dispatch = useDispatch();
  const id = match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const OrderDelivered = useSelector((state) => state.OrderDelivered);
  const { success, loading: deliverloading } = OrderDelivered;

  useEffect(() => {
    if (!order || success || order._id !== id) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id, success, order]);

  const deliveredHandler = () => {
    dispatch(DeliverOrder(order));
  };

  return (
    <Container className="py-5">
      {loading ? (
        <Loader />
      ) : error ? (
        <div class="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      ) : (
        <Container fluid>
          <Row>
            <Col md={8}>
              <h4 className="mb-3">ID: {order._id}</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2 className="pb-2">Order Details</h2>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address}
                  </p>
                  <p>
                    <strong>Payment Method: </strong>
                    {order.paymentMethod}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2 className="pb-2">Payment</h2>
                  {order.isPaid ? (
                    <div class="alert alert-success mt-3" role="alert">
                      Paid
                    </div>
                  ) : (
                    <div class="alert alert-danger mt-3" role="alert">
                      Not Paid
                    </div>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2 className="pb-2">Delivery</h2>
                  {order.isDelivered ? (
                    <div class="alert alert-success mt-3" role="alert">
                      Delivered
                    </div>
                  ) : (
                    <div class="alert alert-danger mt-3" role="alert">
                      Not Delivered
                    </div>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <p>No orders yet</p>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index} className="border-0">
                          <Row className="align-items-center">
                            <Col md={2}>
                              <Image src={item.image} fluid rounded />
                            </Col>
                            <Col>{item.name}</Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
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
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items Price</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping Price</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                      {deliverloading && <Loader />}
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={() => {
                          deliveredHandler();
                        }}
                      >
                        Mark as Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default OrderDetails;
