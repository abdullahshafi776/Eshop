import React, { useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "../components/Loader";
import { getProducts, delProduct } from "../Redux/actions/productAction";

const ProductsListings = ({ history }) => {
  const dispatch = useDispatch();

  const Products = useSelector((state) => state.Products);
  const { products, loading, error } = Products;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { success, loading: deleteloading, error: delerror } = productDelete;

  useEffect(() => {
    if (success) {
      dispatch(getProducts());
    } else {
      if (userInfo && userInfo.isAdmin) {
        dispatch(getProducts());
      } else {
        history.push("/login");
      }
    }
  }, [dispatch, history, userInfo, success]);

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between pb-3">
        <h3 className="">Products</h3>
        <Link to="/createproduct" className="btn btn-primary text-white border">
          +Add New
        </Link>
      </div>

      {delerror && (
        <div className="alert alert-danger mt-3" role="alert">
          {delerror}
        </div>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      ) : (
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image}
                      className="listing_img"
                      alt={product.name}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <Link to={`/editproduct/${product._id}`}>
                      <i className="fa-solid fa-edit text-warning"></i>
                    </Link>
                    <button
                      className="icon_btn pl-2"
                      onClick={(e) => {
                        dispatch(delProduct(product._id));
                      }}
                    >
                      <i className="fa-solid fa-trash text-danger"></i>
                    </button>
                    {deleteloading && <Loader />}
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

export default ProductsListings;
