import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, userUpdate } from "../Redux/actions/userActions";
import { USER_UPDATE_RESET } from "../Redux/constants/userConstant";
import { Loader } from "../components/Loader";

const EditUser = ({ history, match }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { user, loading, error } = userDetail;

  const userUpdated = useSelector((state) => state.userUpdate);
  const { loading: updateloading, error: errorloading, success } = userUpdated;

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, user, userId, success]);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(userUpdate({ _id: userId, name, email }));
  };

  return (
    <>
      <section id="contact-us" className="contact-us section profile_section">
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <div className="form-main">
                <div className="title">
                  <h4>Update User</h4>
                  {error && (
                    <div class="alert alert-danger mt-3" role="alert">
                      {error}
                    </div>
                  )}
                  {errorloading && (
                    <div class="alert alert-danger mt-3" role="alert">
                      {errorloading}
                    </div>
                  )}
                  {success && (
                    <div class="alert alert-success mt-3" role="alert">
                      Profile Updated
                    </div>
                  )}
                  {loading && <Loader />}
                  {updateloading && <Loader />}
                </div>
                <form className="form" onSubmit={handleUpdateUser}>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label>
                          Username<span>*</span>
                        </label>
                        <input
                          name="name"
                          type="text"
                          placeholder=""
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>
                          Email<span>*</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          placeholder=""
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group button text-right">
                        <button type="submit" className="btn">
                          update
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default EditUser;
