import { Link } from "react-router-dom";

const ShopSideBar = () => {
  return (
    <div className="shop-sidebar">
      {/*<!-- Single Widget -->*/}
      <div className="single-widget category">
        <h3 className="title">Categories</h3>
        <ul className="categor-list">
          <li>
            <Link to="#">T-shirts</Link>
          </li>
          <li>
            <Link to="#">jacket</Link>
          </li>
          <li>
            <Link to="#">jeans</Link>
          </li>
          <li>
            <Link to="#">sweatshirts</Link>
          </li>
          <li>
            <Link to="#">trousers</Link>
          </li>
          <li>
            <Link to="#">kitwears</Link>
          </li>
          <li>
            <Link to="#">accessories</Link>
          </li>
        </ul>
      </div>
      {/*<!--/ End Single Widget -->*/}
      {/*<!-- Shop By Price -->*/}
      <div className="single-widget range">
        <h3 className="title">Shop by Price</h3>
        <div className="price-filter">
          <div className="price-filter-inner">
            <div id="slider-range"></div>
            <div className="price_slider_amount">
              <div className="label-input">
                <span>Range:</span>
                <input
                  type="text"
                  id="amount"
                  name="price"
                  placeholder="Add Your Price"
                />
              </div>
            </div>
          </div>
        </div>
        <ul className="check-box-list">
          <li>
            <label className="checkbox-inline" for="1">
              <input name="news" id="1" type="checkbox" />
              $20 - $50<span className="count">(3)</span>
            </label>
          </li>
          <li>
            <label className="checkbox-inline" for="2">
              <input name="news" id="2" type="checkbox" />
              $50 - $100<span className="count">(5)</span>
            </label>
          </li>
          <li>
            <label className="checkbox-inline" for="3">
              <input name="news" id="3" type="checkbox" />
              $100 - $250<span className="count">(8)</span>
            </label>
          </li>
        </ul>
      </div>
      {/*<!--/ End Shop By Price -->*/}
      {/*<!-- Single Widget -->*/}
      <div className="single-widget recent-post">
        <h3 className="title">Recent post</h3>
        {/*<!-- Single Post -->*/}
        <div className="single-post first">
          <div className="image">
            <img src="/images/k3.jpg" alt="#" />
          </div>
          <div className="content">
            <h5>
              <Link to="#">Girls Dress</Link>
            </h5>
            <p className="price">$99.50</p>
            <ul className="reviews">
              <li className="yellow">
                <i className="ti-star"></i>
              </li>
              <li className="yellow">
                <i className="ti-star"></i>
              </li>
              <li className="yellow">
                <i className="ti-star"></i>
              </li>
              <li>
                <i className="ti-star"></i>
              </li>
              <li>
                <i className="ti-star"></i>
              </li>
            </ul>
          </div>
        </div>
        {/*<!-- End Single Post -->*/}
        {/*<!-- Single Post -->*/}
        <div className="single-post first">
          <div className="image">
            <img src="/images/wh2.jpg" alt="#" />
          </div>
          <div className="content">
            <h5>
              <Link to="#">Women Clothings</Link>
            </h5>
            <p className="price">$99.50</p>
            <ul className="reviews">
              <li className="yellow">
                <i className="ti-star"></i>
              </li>
              <li className="yellow">
                <i className="ti-star"></i>
              </li>
              <li className="yellow">
                <i className="ti-star"></i>
              </li>
              <li className="yellow">
                <i className="ti-star"></i>
              </li>
              <li>
                <i className="ti-star"></i>
              </li>
            </ul>
          </div>
        </div>
        {/*<!-- End Single Post -->*/}
        {/*<!-- Single Post -->*/}
        <div className="single-post first">
          <div className="image">
            <img src="/images/mh1.jpg" alt="#" />
          </div>
          <div className="content">
            <h5>
              <Link to="#">Man Tshirt</Link>
            </h5>
            <p className="price">$99.50</p>
            <ul className="reviews">
              <li className="yellow">
                <i className="ti-star"></i>
              </li>
              <li className="yellow">
                <i className="ti-star"></i>
              </li>
              <li className="yellow">
                <i className="ti-star"></i>
              </li>
              <li className="yellow">
                <i className="ti-star"></i>
              </li>
              <li className="yellow">
                <i className="ti-star"></i>
              </li>
            </ul>
          </div>
        </div>
        {/*<!-- End Single Post -->*/}
      </div>
      {/*<!--/ End Single Widget -->*/}
      {/*<!-- Single Widget -->*/}
      <div className="single-widget category">
        <h3 className="title">Manufacturers</h3>
        <ul className="categor-list">
          <li>
            <Link to="#">Forever</Link>
          </li>
          <li>
            <Link to="#">giordano</Link>
          </li>
          <li>
            <Link to="#">abercrombie</Link>
          </li>
          <li>
            <Link to="#">ecko united</Link>
          </li>
          <li>
            <Link to="#">zara</Link>
          </li>
        </ul>
      </div>
      {/*<!--/ End Single Widget -->*/}
    </div>
  );
};

export default ShopSideBar;
