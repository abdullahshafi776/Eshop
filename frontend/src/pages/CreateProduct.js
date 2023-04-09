import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../Redux/actions/productAction";
import { Loader } from "../components/Loader";

const CreateProduct = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, success, error } = productCreate;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    console.log(formData);

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
    dispatch(createProduct({ name, price, image, category }));
  };

  const successhandler = () => {
    toast.success("Product Added");
    setName("");
    setCategory("");
    setPrice("");
    setImage("");
  };

  useEffect(() => {
    success ? successhandler() : error ? toast.error(error) : <></>;
  }, [success, error]);

  return (
    <Container className="py-5 shadow-1">
      <Row>
        <Col md={{ offset: 3, span: 6 }}>
          {loading && <Loader />}
          <Form
            className="form1 p-5"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <div className="text-center">
              <h4 className="lead pb-3">Add a new Product</h4>
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
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>
                Image<span className="text-danger">*</span>
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
              Upload
            </Button>
            <ToastContainer />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProduct;
