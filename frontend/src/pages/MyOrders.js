import React, { useEffect } from "react";
import { getMyOrderList } from "../Redux/actions/orderActions";
import { Link } from "react-router-dom";
import { Container, Col, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../components/Loader";

const MyOrders = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const myOrdersList = useSelector((state) => state.myOrdersList);
  const { loading, error, orders } = myOrdersList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getMyOrderList());
    }
  }, [dispatch, history, userInfo]);

  return (
    <Container className="py-5">
      <Row>
        <Col lg={12}>
          <h1 className="pb-3">My Orders</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <div class="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          ) : (
            <>
              {orders.length === 0 ? (
                <h2 className="text-center">No Orders Yet</h2>
              ) : (
                <Table responsive striped bordered hover size="md">
                  <thead>
                    <tr>
                      <th>Order id</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Delivered</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && <Loader />}
                    {orders.map((order) => {
                      return (
                        <tr key={order._id}>
                          <td>{order._id}</td>
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
  );
};

export default MyOrders;
