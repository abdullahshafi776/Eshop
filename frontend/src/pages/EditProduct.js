import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../Redux/actions/productAction";
import { Loader } from "../components/Loader";
import { listProductDetails } from "../Redux/actions/productAction";
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from "../Redux/constants/productsConstants";

const EditProduct = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading: productloading } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading, success, error } = productUpdate;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/uploads", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, name, price, image, category }));
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });
      history.push("/productlist");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setImage(product.image);
      }
    }
  }, [dispatch, id, product, success, history]);

  return (
    <Container className="py-5 shadow-1">
      {loading && <Loader />}
      {productloading && <Loader />}
      <Row>
        <Col md={{ offset: 3, span: 6 }}>
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          <Form
            className="form1 p-5"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <div className="text-center">
              <h4 className="lead pb-3">Update Product</h4>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>
                Name<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Price<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="price"
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Category<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Image
              src={image}
              width="70px"
              height="70px"
              className="py-2"
              alt=""
            />
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>
                Update Image<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="file"
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
                className="border-0 px-0"
              />
              {uploading && <Loader />}
            </Form.Group>
            <Button type="submit" variant="primary btn-block">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProduct;
