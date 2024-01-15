import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaMinus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

import { useSelector, useDispatch } from "react-redux";
import { deleteItem, clearCart, incrimentQuantity, dencrimentQuantity } from "../../redux/storeSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.storeReducer.products);

  const totalPrice = products.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

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
                Cart
              </li>
            </ol>
          </nav>
        </div>
        {products.length > 0 ? (
          <div className="row my-4">
            <h2 className="my-4">Shopping Cart</h2>
            <div className="col-md-8">
              {products.map((item) => {
                return (
                  <div className="mb-4 gap-5 border shadow-sm p-3 bg-light" key={item.id}>
                    <div className="item">
                      <h2>{item.title}</h2>
                      <p className="lead fs-6">{item.description.substring(0, 100)}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-3 align-items-center">
                          <button className="btn bg-white border shadow-sm" onClick={() => dispatch(dencrimentQuantity(item.id))}>
                            <FaMinus />
                          </button>
                          <h6>{item.quantity}</h6>
                          <button className="btn bg-white border shadow-sm" onClick={() => dispatch(incrimentQuantity(item.id))}>
                            <FaPlus />
                          </button>
                        </div>
                        <button className="btn text-danger fs-3" onClick={() => dispatch(deleteItem(item.id))}>
                          <RiDeleteBinLine />
                        </button>
                      </div>
                      <h5 className="text-danger mt-2">price: $ {item.price}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-md-4 totalPrice">
              <div className="border shadow-sm p-3 bg-light">
                <h3>total price : {totalPrice.toFixed(2)} </h3>
              </div>
              <button className="btn btn-danger mt-3" onClick={() => dispatch(clearCart())}>
                Clear Cart
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center my-5">
            <img src="/assets/cart.png" alt="" className="w-25" />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
