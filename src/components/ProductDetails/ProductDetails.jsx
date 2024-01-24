import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { addToCart } from "../../redux/storeSlice";
import { useDispatch } from "react-redux";
import { FaCartPlus } from "react-icons/fa";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const url = "https://dummyjson.com/products";
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
        <div className="border col-lg-9 mt-5 p-3 m-auto">
          <div className="row">
            <div className="col-md-3 mb-4">
              <img src={prodact.thumbnail} alt="" style={{ width: "100%" }} />
            </div>
            <div className="col-md-9">
              <h3 className="mb-3"> {prodact.title}</h3>
              <p> {prodact.description}</p>
              <h4 className="text-danger"> {prodact.price}</h4>
              <h5 className="text-alert-secondary"> brand: {prodact.brand}</h5>
              <h5 className="text-alert-secondary">
                Stock: <span className="text-success">{prodact.stock}</span>
              </h5>
              <div className="d-flex mt-3">
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
                  className="btn btn-success w-25"
                >
                  <FaCartPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
