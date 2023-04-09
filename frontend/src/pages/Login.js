import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../Redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../components/Loader";

const Login = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, redirect, history]);

  const HandleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <React.Fragment>
      {/*<!-- Breadcrumbs -->*/}
      <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bread-inner">
                <ul className="bread-list">
                  <li>
                    <Link to="/">
                      Home<i className="ti-arrow-right"></i>
                    </Link>
                  </li>
                  <li className="active">
                    <Link to="/login">Login</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<!-- End Breadcrumbs -->*/}

      {/*<!-- Start Login -->*/}
      <section id="contact-us" className="contact-us section">
        <div className="container">
          <div className="contact-head">
            <div className="row">
              <div className="offset-lg-3 col-lg-6 col-12">
                <div className="form-main">
                  <div className="title">
                    <h4>Login Here</h4>
                    <h3>Enter Your Credentials</h3>
                    {error && (
                      <div class="alert alert-danger mt-3" role="alert">
                        {error}
                      </div>
                    )}
                    {loading && <Loader />}
                  </div>
                  <form className="form" onSubmit={HandleLogin}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label>
                            Username/Email<span>*</span>
                          </label>
                          <input
                            name="email"
                            type="text"
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
                        <div className="form-group button text-right">
                          <button type="submit" className="btn btn1">
                            Login
                          </button>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="">
                          <Link to="/register" className>
                            Create Account
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Login;
