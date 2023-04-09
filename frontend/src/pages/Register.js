import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../Redux/actions/userActions";
import { Loader } from "../components/Loader";

export default function Register({ history }) {
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const { name, email, password, confirmpassword } = user;

  const onvaluechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const HandleReister = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords Do not Match");
    } else {
      dispatch(register(name, email, password));
      // history.push("/");
    }
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
                    <Link to="/login">Register</Link>
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
                    <h4>Not Register</h4>
                    <h3>Create a New Account</h3>
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
                    {loading && <Loader />}
                  </div>
                  <form className="form" onSubmit={HandleReister}>
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
                            onChange={(e) => onvaluechange(e)}
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
                            onChange={(e) => onvaluechange(e)}
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
                            onChange={(e) => onvaluechange(e)}
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
                            onChange={(e) => onvaluechange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group button text-right">
                          <button type="submit" className="btn btn1">
                            Register
                          </button>
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
}
