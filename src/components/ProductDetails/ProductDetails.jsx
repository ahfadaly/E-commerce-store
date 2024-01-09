import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { addToCart } from "../../redux/amazonSlice";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const url = "https://fakestoreapi.com/products";
  const [prodact, setProduct] = useState([]);
  const prams = useParams();

  useEffect(() => {
    fetch(`${url}/${prams.productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  });

  return (
    <>
      <div className="container">
        <div className="mt-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                <Link to="/products">Products</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Product Details
              </li>
            </ol>
          </nav>
        </div>
        <div className="border col-lg-9  mt-3 p-3 shadow-sm">
          <div className="row">
            <div className="col-md-3">
              <img src={prodact.image} alt="" style={{ width: "200px" }} />
            </div>
            <div className="col-md-9">
              <h3 className="my-3"> {prodact.title}</h3>
              <p> {prodact.description}</p>
              <h4 className="text-danger"> {prodact.price}</h4>
              <div className="d-flex gap-3 mt-2">
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: prodact.id,
                        title: prodact.title,
                        description: prodact.description,
                        price: prodact.price,
                        image: prodact.image,
                        quantity: 1,
                      })
                    )
                  }
                  className="btn btn-success"
                >
                  Add to Cart
                </button>
                <Link to="/cart" className="btn btn-primary ">
                  Go to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
