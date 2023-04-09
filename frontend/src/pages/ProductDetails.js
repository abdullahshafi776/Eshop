import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { FcApproval } from "react-icons/fc";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineHeart } from "react-icons/ai";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlus,
  FaPinterest,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Cart } from "../Redux/actions/cartAction";
import { Loader } from "../components/Loader";
import { listProductDetails } from "../Redux/actions/productAction";

export default function Productdetail() {
  const dispatch = useDispatch();

  const [item, setitem] = useState({
    size: "M",
    color: "black",
    qty: 1,
  });

  const onvaluechange = (e) => {
    setitem({ ...item, [e.target.name]: e.target.value });
  };
  const { size, color, qty } = item;

  const incQty = () => setitem({ ...item, qty: qty + 1 });
  const decQty = () =>
    qty === 1
      ? setitem({ ...item, qty: 1 })
      : setitem({ ...item, qty: qty - 1 });

  const { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading } = productDetails;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Cart(id, item));
  };
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  return (
    <React.Fragment>
      <div className="container-fluid">
        {loading && <Loader />}
        <div className="row no-gutters py-5">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <img src={product.image} className="detail-img" alt="#" />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="quickview-content">
              <h2>{product.name}</h2>
              <div className="quickview-ratting-review">
                <div className="quickview-ratting-wrap">
                  <div className="quickview-ratting">
                    <i className="yellow fa fa-star"></i>
                    <i className="yellow fa fa-star"></i>
                    <i className="yellow fa fa-star"></i>
                    <i className="yellow fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <Link to="#"> (1 customer review)</Link>
                </div>
                <div className="quickview-stock">
                  <span className="d-flex align-items-center">
                    <FcApproval className="checked mr-2" /> in stock
                  </span>
                </div>
              </div>
              <h3>${product.price}</h3>
              <div className="quickview-peragraph">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Mollitia iste laborum ad impedit pariatur esse optio tempora
                  sint ullam autem deleniti nam in quos qui nemo ipsum numquam.
                </p>
              </div>
              <Form onSubmit={handleSubmit}>
                <div className="size">
                  <div className="row">
                    <div className="col-lg-6 col-12">
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label className="title">Size</Form.Label>
                        <Form.Control
                          as="select"
                          name="size"
                          value={size}
                          onChange={(e) => onvaluechange(e)}
                        >
                          <option>Select</option>
                          <option>S</option>
                          <option>M</option>
                          <option>L</option>
                          <option>XL</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                    <div className="col-lg-6 col-12">
                      <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label className="title">Colour</Form.Label>
                        <Form.Control
                          as="select"
                          name="color"
                          value={color}
                          onChange={(e) => onvaluechange(e)}
                        >
                          <option>Select</option>
                          <option>orange</option>
                          <option>purple</option>
                          <option>black</option>
                          <option>pink</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>
                </div>
                <div className="quantity">
                  {/* <!-- Input Order --> */}
                  <div className="input-group">
                    <div className="button minus">
                      <button
                        type="button"
                        className="btn btn-number"
                        data-type="minus"
                        data-field="quant[1]"
                        onClick={() => decQty()}
                      >
                        <AiOutlineMinus />
                      </button>
                    </div>
                    <Form.Control
                      type="text"
                      name="qty"
                      className="input-number"
                      value={qty}
                      onChange={(e) => onvaluechange(e)}
                    />
                    <div className="button plus">
                      <button
                        type="button"
                        className="btn btn-number"
                        data-type="plus"
                        data-field="quant[1]"
                        onClick={() => incQty()}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>
                  {/* <!--/ End Input Order --> */}
                </div>
                <div className="add-to-cart">
                  <div className="d-flex">
                    <button type="submit" className="btn">
                      Add to cart
                    </button>
                    <Link to="#" className="btn min">
                      <AiOutlineHeart />
                    </Link>
                  </div>
                </div>
              </Form>
              <div className="default-social">
                <h4 className="share-now">Share:</h4>
                <ul>
                  <li>
                    <Link className="facebook" to="#">
                      <FaFacebookF />
                    </Link>
                  </li>
                  <li>
                    <Link className="twitter" to="#">
                      <FaTwitter />
                    </Link>
                  </li>
                  <li>
                    <Link className="youtube" to="#">
                      <FaPinterest />
                    </Link>
                  </li>
                  <li>
                    <Link className="dribbble" to="#">
                      <FaGooglePlus />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
