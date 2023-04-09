import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../components/Loader";
import { getProducts, filterHotItems } from "../Redux/actions/productAction";
import Slider from "react-slick";
import SingleProduct from "./SingleProduct";

export default function ProductSlider() {
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.hotProducts);

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    ltr: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(filterHotItems());
  }, [dispatch]);

  return (
    <>
      <Slider {...settings}>
        {loading ? (
          <Loader />
        ) : error ? (
          <div class="alert alert-danger mt-3 w-100" role="alert">
            {error}
          </div>
        ) : (
          product.map((p) => {
            return <SingleProduct p={p} />;
          })
        )}
      </Slider>
    </>
  );
}
