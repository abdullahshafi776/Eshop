import React, { useEffect } from "react";
import { getOrderList } from "../Redux/actions/orderActions";
import { Link } from "react-router-dom";
import { Container, Col, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../components/Loader";

const OrderList = () => {
  const dispatch = useDispatch();

  const OrdersList = useSelector((state) => state.OrdersList);
  const { loading, error, orders } = OrdersList;

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  return (
    <>
      <section id="contact-us" className="contact-us section profile_section">
        <Container>
          <Row>
            <Col lg={12}>
              {loading ? (
                <Loader />
              ) : error ? (
                <div class="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              ) : (
                <>
                  <h2 className="pb-3">Order List</h2>
                  {orders.length === 0 ? (
                    <h4 className="text-center lead">No orders yet</h4>
                  ) : (
                    <Table responsive striped bordered hover size="md">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>User</th>
                          <th>Date</th>
                          <th>Total</th>
                          <th>Paid</th>
                          <th>Delivered</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => {
                          return (
                            <tr key={order._id}>
                              <td>{order._id}</td>
                              <td>{order.user && order.user.name}</td>
                              <td>{order.createdAt.substring(0, 10)}</td>
                              <td>${order.totalPrice}</td>
                              <td>
                                {order.isPaid ? (
                                  <i class="fa-solid fa-circle-check text-success"></i>
                                ) : (
                                  <i class="fa-solid fa-circle-xmark text-danger"></i>
                                )}
                              </td>
                              <td>
                                {order.isDelivered ? (
                                  <i class="fa-solid fa-circle-check text-success"></i>
                                ) : (
                                  <i class="fa-solid fa-circle-xmark text-danger"></i>
                                )}
                              </td>
                              <td>
                                <Link to={`/orderDetails/${order._id}`}>
                                  <i class="fa-solid fa-eye text-warning"></i>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default OrderList;
