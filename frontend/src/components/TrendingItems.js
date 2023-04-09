import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, filterProducts } from "../Redux/actions/productAction";
import { Loader } from "../components/Loader";
import SingleProduct from "./SingleProduct";

const TrendingItems = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productFilter
  );

  useEffect(() => {
    dispatch(getProducts());
    dispatch(filterProducts("men"));
  }, [dispatch]);
  return (
    <div className="product-info">
      <div className="nav-main">
        {/* <!-- Tab Nav --> */}
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <Link
              className="nav-link active"
              data-toggle="tab"
              to=""
              role="tab"
              onClick={() => {
                dispatch(filterProducts("men"));
              }}
            >
              Man
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-toggle="tab"
              to=""
              role="tab"
              onClick={() => {
                dispatch(filterProducts("women"));
              }}
            >
              Woman
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-toggle="tab"
              to=""
              role="tab"
              onClick={() => {
                dispatch(filterProducts("accessories"));
              }}
            >
              Accessories
            </Link>
          </li>
        </ul>
        {/* <!--/ End Tab Nav --> */}
      </div>
      <div className="tab-content" id="myTabContent">
        {/* <!-- Start Single Tab --> */}
        <div className="tab-pane fade show active" id="man" role="tabpanel">
          <div className="tab-single">
            <Row>
              {loading ? (
                <Loader />
              ) : error ? (
                <div class="alert alert-danger mt-3 w-100" role="alert">
                  {error}
                </div>
              ) : (
                product.map((p) => {
                  return (
                    <Col xl={3} md={4}>
                      <SingleProduct p={p} />
                    </Col>
                  );
                })
              )}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingItems;
