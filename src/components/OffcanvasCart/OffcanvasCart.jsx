import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { deleteItem, clearCart, incrimentQuantity, dencrimentQuantity } from "../../redux/storeSlice";

const OffcanvasCart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.storeReducer.products);
  const cart = useSelector((state) => state.storeReducer.products);

  const totalPrice = products.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);
  return (
    <div>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="cart" aria-labelledby="cartLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Shopping Cart ( {cart.length > 0 ? cart.length : 0} )
          </h5>
          <button type="button" className="btn text-reset" data-bs-dismiss="offcanvas" aria-label="Close">
            <FaArrowRight />
          </button>
        </div>
        <div className="offcanvas-body">
          {products.length > 0 ? (
            <div>
              {products.map((item) => {
                return (
                  <div className="mb-3 border-bottom pb-3" key={item.id}>
                    <div className="item">
                      <div className="row align-items-center">
                        <div className="col-4">
                          <img src={item.thumbnail} alt="img-product" style={{ width: "90px", height: "90px", objectFit: "contain" }} />
                        </div>
                        <div className="col-8">
                          <h6>{item.title}</h6>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div className="d-flex gap-2 align-items-center border rounded">
                              <button className="btn border" onClick={() => dispatch(dencrimentQuantity(item.id))}>
                                <FaMinus />
                              </button>
                              <h6 className="m-0">{item.quantity}</h6>
                              <button className="btn border" onClick={() => dispatch(incrimentQuantity(item.id))}>
                                <FaPlus />
                              </button>
                            </div>
                            <h5 className="text-secondary m-0">${item.price}</h5>
                            <button className="btn text-secondary fs-5" onClick={() => dispatch(deleteItem(item.id))}>
                              <IoMdClose />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center my-5">
              <img src="/assets/cart.png" alt="" className="w-25" />
            </div>
          )}
        </div>
        <>
          {products.length > 0 ? (
            <div className="totalPrice shadow-sm p-3 bg-light border">
              <div className="d-flex justify-content-between align-items-center">
                <h3>Total: {totalPrice.toFixed(2)} </h3>
                <button className="btn btn-outline-danger " onClick={() => dispatch(clearCart())}>
                  <RiDeleteBinLine />
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      </div>
    </div>
  );
};

export default OffcanvasCart;
