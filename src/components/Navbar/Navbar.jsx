import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const cart = useSelector((state) => state.storeReducer.products);

  return (
    <div className="bg-light shadow-sm py-2 fixed-top">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center p-2">
          <Link className="navbar-brand fw-bold fs-4" to="/">
            store
          </Link>
          <ul className="list-unstyled d-flex gap-2 m-0 p-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className="nav-link">
                Products
              </NavLink>
            </li>
          </ul>
          <div className="cart">
            <button
              className="btn btn-secondary position-relative"
              data-bs-toggle="offcanvas"
              href="#cart"
              role="button"
              aria-controls="cart"
            >
              <FaCartPlus />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length > 0 ? cart.length : 0}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
