import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { getProducts } from "../Redux/actions/productAction";
import { Form } from "react-bootstrap";

const SearchBox = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [keyword, dispatch]);

  return (
    <>
      <div className="search-bar-top">
        <div className="search-bar">
          <Form onSubmit={submitHandler}>
            <Form.Control
              name="keyword"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              placeholder="Search Products Here"
            />
            <button className="btnn" type="submit">
              <AiOutlineSearch />
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
