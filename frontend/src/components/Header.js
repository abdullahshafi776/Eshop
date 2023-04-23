import React, { useState, useEffect } from "react"
import { Link, NavLink } from "react-router-dom"
import {
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineShopping,
  AiOutlineMail,
} from "react-icons/ai"
import { BsHeadphones, BsStopwatch } from "react-icons/bs"
import { BiMap } from "react-icons/bi"
import { Container, Col, Row, Navbar, Nav } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { userLogout } from "../Redux/actions/userActions"
import SearchBox from "./SearchBox"

export default function Header() {
  const dispatch = useDispatch()
  const [count, setCount] = useState(0)
  const cartItems = useSelector((state) => state.Cart.orderItems)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutUser = () => {
    dispatch(userLogout())
  }

  useEffect(() => {
    setCount(Object.keys(cartItems).length)
  }, [cartItems])

  const navstyle = {
    color: "#fff",
    background: " #F7941D",
  }
  return (
    <>
      <header className='header shop'>
        {/* <!-- Topbar --> */}
        <div className='topbar'>
          <Container>
            <Row>
              <Col lg={4}>
                {/* <!-- Top Left --> */}
                <div className='top-left'>
                  <ul className='list-main'>
                    <li>
                      <BsHeadphones /> +060 (800) 801-582
                    </li>
                    <li>
                      <AiOutlineMail />
                      support@eshop.com
                    </li>
                  </ul>
                </div>
                {/* <!--/ End Top Left --> */}
              </Col>
              <Col lg={8}>
                {/* <!-- Top Right --> */}
                <div className='right-content'>
                  <ul className='list-main'>
                    <li>
                      <BiMap /> Store location
                    </li>
                    <li>
                      <BsStopwatch /> Daily deal
                    </li>
                    {!userInfo ? (
                      <>
                        <li>
                          <i className='ti-power-off'></i>
                          <Link to='/login'>Login</Link>
                        </li>
                        <li>
                          <i className='ti-rocket'></i>
                          <Link to='/register'>Register</Link>
                        </li>
                      </>
                    ) : (
                      <></>
                    )}
                  </ul>
                </div>
                {/* <!-- End Top Right --> */}
              </Col>
            </Row>
          </Container>
        </div>
        {/* <!-- End Topbar --> */}
        <div className='middle-inner'>
          <Container>
            <Row>
              <div className='col-lg-2 col-md-2 col-6 order-md-1 order-1'>
                {/* <!-- Logo --> */}
                <div className='logo'>
                  <Link to='/'>
                    <img src='/images/logo.png' alt='logo' />
                  </Link>
                </div>
              </div>
              <div className='col-lg-8 col-md-7 col-12 order-md-2 order-3'>
                <SearchBox />
              </div>
              <div className='col-lg-2 col-md-3 col-6 order-md-2 order-2'>
                <div className='right-bar'>
                  {/* <!-- Search Form --> */}
                  <div className='sinlge-bar'>
                    <Link to='/' className='single-icon'>
                      <AiOutlineHeart />
                    </Link>
                  </div>
                  {userInfo ? (
                    <div className='sinlge-bar shopping user_option'>
                      <Link to='/' className='single-icon'>
                        <AiOutlineUser />
                      </Link>
                      <div className='shopping-item'>
                        <div className='dropdown-cart-header'>
                          <p>{userInfo.name}</p>
                        </div>
                        <Link className='dropdown-item pl-0' to='/profile'>
                          Profile
                        </Link>
                        <Link className='dropdown-item pl-0' to='/myorders'>
                          My Orders
                        </Link>
                        {userInfo && userInfo.isAdmin && (
                          <>
                            <Link className='dropdown-item pl-0' to='/userlist'>
                              Users
                            </Link>
                            <Link
                              className='dropdown-item pl-0'
                              to='/productlist'
                            >
                              Products
                            </Link>
                            <Link
                              className='dropdown-item pl-0'
                              to='/orderlist'
                            >
                              Orders
                            </Link>
                          </>
                        )}
                        <button
                          onClick={logoutUser}
                          className='dropdown-item py-2 pl-0'
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className='sinlge-bar shopping'>
                    <Link to='/cart' className='single-icon'>
                      <AiOutlineShopping />
                      <span className='total-count'>{count}</span>
                    </Link>
                    {/* <!-- Shopping Item --> */}
                    <div className='shopping-item'>
                      {cartItems.length !== 0 ? (
                        <>
                          <div className='dropdown-cart-header'>
                            <span>{count} Items</span>
                            <Link to='/cart'>View Cart</Link>
                          </div>
                          <ul className='shopping-list'>
                            {cartItems.map((p, index) => {
                              return (
                                <li key={index}>
                                  <Link
                                    to='#'
                                    className='remove'
                                    title='Remove this item'
                                  >
                                    <i className='fa fa-remove'></i>
                                  </Link>
                                  <Link className='cart-img' to='#'>
                                    <img src={p.image} alt='#' />
                                  </Link>
                                  <h4>
                                    <Link to='#'>{p.name}</Link>
                                  </h4>
                                  <p className='quantity'>
                                    {p.qty}x -{" "}
                                    <span className='amount'>${p.price}</span>
                                  </p>
                                </li>
                              )
                            })}
                          </ul>
                        </>
                      ) : (
                        <>
                          <p className=''>Your Cart is Empty!</p>
                        </>
                      )}
                    </div>
                    {/* <!--/ End Shopping Item --> */}
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </div>
        <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
          <Container>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mx-auto'>
                <NavLink activeStyle={navstyle} to='/' exact>
                  Home
                </NavLink>
                <NavLink activeStyle={navstyle} to='/product' exact>
                  Products
                </NavLink>
                <NavLink activeStyle={navstyle} to='/contact' exact>
                  Contact Us
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* <!--/ End Header Inner --> */}
      </header>
    </>
  )
}
