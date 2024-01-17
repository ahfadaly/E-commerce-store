import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { Routes, Route } from "react-router-dom";
import OffcanvasCart from "./components/OffcanvasCart/OffcanvasCart";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="product/:productId" element={<ProductDetails />} />
      </Routes>
      <OffcanvasCart />
    </>
  );
}

export default App;
