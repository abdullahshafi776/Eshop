import React from "react";
import ProductSlider from "../components/ProductSlider";
import TrendingItems from "../components/TrendingItems";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

const Home = () => {
  return (
    <React.Fragment>
      <section className="hero-slider">
        {/* <!-- Single Slider --> */}
        <div className="single-slider">
          <Container>
            <div className="row no-gutters">
              <Col lg={9}>
                <div className="text-inner">
                  <div className="row">
                    <div className="col-lg-7 col-12">
                      <div className="hero-text">
                        <h1>
                          <span>UP TO 50% OFF </span>Shirts For Man
                        </h1>
                        <p>
                          Maboriosam in a nesciung eget magnae <br /> dapibus
                          disting tloctio in the find it pereri <br /> odiy
                          maboriosm.
                        </p>
                        <div className="button">
                          <Link to="/product" className="btn">
                            Shop Now!
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </div>
          </Container>
        </div>
        {/* <!--/ End Single Slider --> */}
      </section>
      <div className="product-area section">
        <Container>
          <Row>
            <Col sm={12}>
              <div className="section-title">
                <h2>Trending Item</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <TrendingItems />
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="pb-5">
        <Row>
          <div className="section-title mb-0 w-100">
            <h2>Hot Item</h2>
          </div>
          <Col sm={12}>
            <ProductSlider />
          </Col>
        </Row>
      </Container>

      <section className="shop-services section home">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-service">
                <i className="ti-rocket"></i>
                <h4>Free shiping</h4>
                <p>Orders over $100</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-service">
                <i className="ti-reload"></i>
                <h4>Free Return</h4>
                <p>Within 30 days returns</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-service">
                <i className="ti-lock"></i>
                <h4>Sucure Payment</h4>
                <p>100% secure payment</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-service">
                <i className="ti-tag"></i>
                <h4>Best Peice</h4>
                <p>Guaranteed price</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shop-newsletter section">
        <div className="container">
          <div className="inner-top">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-12">
                <div className="inner">
                  <h4>Newsletter</h4>
                  <p>
                    {" "}
                    Subscribe to our newsletter and get <span>10%</span> off
                    your first purchase
                  </p>
                  <form
                    action="mail/mail.php"
                    method="get"
                    target="_blank"
                    className="newsletter-inner"
                  >
                    <input
                      name="EMAIL"
                      placeholder="Your email address"
                      required=""
                      type="email"
                    />
                    <button className="btn">Subscribe</button>
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

export default Home;
