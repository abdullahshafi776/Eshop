import React, { useState, useEffect } from "react";
import { getUserDetails, updateUser } from "../Redux/actions/userActions";
import { Container, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../components/Loader";
import { USER_UPDATE_PROFILE_RESET } from "../Redux/constants/userConstant";

const Profile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateUserprofile = useSelector((state) => state.updateUserprofile);
  const { success, loading: updateloading } = updateUserprofile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, user, dispatch, history, success]);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUser({ id: user._id, name, email, password }));
    }
  };

  return (
    <section id="contact-us" className="contact-us section profile_section">
      <Container>
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <div className="form-main">
              <div className="title">
                <h4>User Profile</h4>
                {loading && <Loader />}
                {message && (
                  <div class="alert alert-danger mt-3" role="alert">
                    {message}
                  </div>
                )}
                {error && (
                  <div class="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}
                {success && (
                  <div class="alert alert-success mt-3" role="alert">
                    Profile Updated
                  </div>
                )}
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
                    <div className="form-group">
                      <label>
                        Password<span>*</span>
                      </label>
                      <input
                        name="password"
                        type="Password"
                        placeholder=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>
                        Confirm Password<span>*</span>
                      </label>
                      <input
                        name="confirmpassword"
                        type="Password"
                        placeholder=""
                        value={confirmpassword}
                        onChange={(e) => setConfirmpassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group button text-right">
                      <button type="submit" className="btn btn1">
                        update
                      </button>
                      {updateloading && <Loader />}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;
