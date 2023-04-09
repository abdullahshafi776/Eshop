import { Link } from "react-router-dom";

const SingleProduct = ({ p }) => {
  return (
    <div className="single-product" key={p._id}>
      <div className="product-img">
        <Link exact to={`/productdetail/${p._id}`}>
          <img className="default-img" src={p.image} alt="#" />
        </Link>
        <div className="button-head">
          <div className="product-action">
            <Link
              data-toggle="modal"
              data-target="#exampleModal"
              title="Quick View"
              to="#"
            >
              <i className=" ti-eye"></i>
              <span>Quick Shop</span>
            </Link>
            <Link title="Wishlist" to="#">
              <i className=" ti-heart "></i>
              <span>Add to Wishlist</span>
            </Link>
            <Link title="Compare" to="#">
              <i className="ti-bar-chart-alt"></i>
              <span>Add to Compare</span>
            </Link>
          </div>
          <div className="product-action-2">
            <Link title="Add to cart" to="#">
              Add to cart
            </Link>
          </div>
        </div>
      </div>
      <div className="product-content text-center">
        <h3>
          <Link to="product-details.html">{p.name}</Link>
        </h3>
        <div className="product-price">
          <span>${p.price}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
