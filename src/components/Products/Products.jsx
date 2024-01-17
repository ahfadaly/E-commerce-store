import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/storeSlice";
import { useDispatch } from "react-redux";
import { IoFilter } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const Products = () => {
  const dispatch = useDispatch();

  const url = "https://dummyjson.com/products";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(false);

  const getProducts = () => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  };
  const getCategories = () => {
    fetch(`${url}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const categoriesUI = categories.map((link) => {
    return (
      <button key={link} className="btn btn-outline-dark m-2 w-100" onClick={() => filtterCategories(link)}>
        {link}
      </button>
    );
  });

  const filtterCategories = (CatName) => {
    fetch(`${url}/category/${CatName}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  };

  const searchProducts = products.filter((product) => product.title.toLowerCase().includes(searchItem.toLowerCase()));

  const productUI = searchProducts.map((item) => {
    return (
      <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6 mb-3">
        <div className="product-item border p-3 shadow-sm position-relative h-100">
          <div className="products-desc">
            <img src={item.thumbnail} style={{ width: "100%", height: "120px", objectFit: "contain" }} />
            <h6 className="my-3">{item.title} </h6>
            <p className="my-3">{item.description.substring(0, 40)} ...</p>
            <h4 className="my-3">$ {item.price}</h4>
          </div>
          <div className="d-flex gap-2 add-cart">
            <Link to={`/product/${item.id}`} className="btn btn-white border shadow-sm">
              <IoEyeOutline />
            </Link>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    thumbnail: item.thumbnail,
                    quantity: 1,
                  })
                )
              }
              className="btn btn-danger border shadow-sm"
            >
              <FaCartPlus />
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mt-5">
          <div className="row justify-content-between">
            <div className="col-3">
              <a
                className="btn btn-primary"
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
              >
                <span className="me-2">Filter Products</span>
                <IoFilter />
              </a>
            </div>
            <div className="col-7">
              <input
                className="form-control"
                type="text"
                placeholder="Search products"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
              />
            </div>
          </div>
          <div className="all-products">
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
              <div className="offcanvas-header">
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <button className="btn btn-outline-dark w-100" onClick={() => getProducts()}>
                  all
                </button>
                <div className="gap-3">{categoriesUI}</div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="row mt-4 p-0">
              {searchProducts.length === 0 ? <p className="text-center display-3">No found</p> : <>{productUI}</>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
