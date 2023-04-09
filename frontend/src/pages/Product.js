import React, { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "../components/Loader";
import SingleProduct from "../components/SingleProduct";
import ShopSideBar from "../components/ShopSideBar";
import { getProducts } from "../Redux/actions/productAction";

export default function Product() {
  const dispatch = useDispatch();
  const Products = useSelector((state) => state.Products);
  const { products, loading, error } = Products;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <React.Fragment>
      {/*<!-- Breadcrumbs -->*/}
      <div className="breadcrumbs">
        <Container>
          <Row>
            <Col sm={12}>
              <div className="bread-inner">
                <ul className="bread-list">
                  <li>
                    <Link to="index1.html">
                      Home<i className="ti-arrow-right"></i>
                    </Link>
                  </li>
                  <li className="active">
                    <Link to="blog-single.html">Products</Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/*<!-- End Breadcrumbs -->*/}

      {/*<!-- Product Style -->*/}
      <section className="product-area shop-sidebar shop section">
        <Container>
          <Row>
            <Col lg={3} md={4}>
              <ShopSideBar />
            </Col>
            <Col lg={9} md={8}>
              <Row>
                <Col sm={12}>
                  {/*<!-- Shop Top -->*/}
                  <div className="shop-top">
                    <ul className="view-mode">
                      <li className="active">
                        <Link to="shop-grid.html">
                          <i className="fa fa-th-large"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="shop-list.html">
                          <i className="fa fa-th-list"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/*<!--/ End Shop Top -->*/}
                </Col>
                {loading ? (
                  <Loader />
                ) : products ? (
                  products.map((p) => {
                    return (
                      <Col lg={4} md={6}>
                        <SingleProduct p={p} />
                      </Col>
                    );
                  })
                ) : error ? (
                  <Col sm={12}>
                    <div className="alert alert-danger mt-3" role="alert">
                      {error}
                    </div>
                  </Col>
                ) : (
                  <></>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      {/*<!--/ End Product Style 1  -->*/}
    </React.Fragment>
  );
}
