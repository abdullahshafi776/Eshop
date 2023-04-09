import React, { useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "../components/Loader";
import { listUsers, deleteUser } from "../Redux/actions/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success } = userDelete;

  const deletehandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, success]);

  return (
    <Container className="py-5">
      <h3 className="text-center pb-3">Users</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <div class="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      ) : (
        <Table responsive striped bordered hover size="md">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <i class="fa-solid fa-circle-check text-success"></i>
                    ) : (
                      <i class="fa-solid fa-circle-xmark text-danger"></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/edituser/${user._id}`}>
                      <i class="fa-solid fa-edit text-warning"></i>
                    </Link>
                    <button
                      className="icon_btn pl-2"
                      onClick={() => deletehandler(user._id)}
                    >
                      <i class="fa-solid fa-trash text-danger"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserListScreen;
