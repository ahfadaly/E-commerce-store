import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/amazonSlice";
import { useDispatch } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();

  const url = "https://fakestoreapi.com/products";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = () => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
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

  const productUI = products.map((item) => {
    return (
      <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6 mb-3">
        <div className="product border p-3 shadow-sm h-100">
          <div className="products">
            <img src={item.image} style={{ width: "200px", height: "200px" }} />
            <h6 className="my-3">{item.title.substring(0, 20)} ...</h6>
            <p className="my-3">{item.description.substring(0, 25)} ...</p>
            <h4 className="my-3">$ {item.price}</h4>
          </div>
          <div className="d-flex gap-2">
            <Link to={`/product/${item.id}`} className="btn btn-danger">
              Details
            </Link>
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    image: item.image,
                    quantity: 1,
                  })
                )
              }
              className="btn btn-success"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  });

  const categoriesUI = categories.map((link) => {
    return (
      <button key={link} className="btn btn-outline-dark" onClick={() => filtterCategories(link)}>
        {link}
      </button>
    );
  });

  const filtterCategories = (CatName) => {
    fetch(`${url}/category/${CatName}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mt-5">
          <div className="d-flex flex-sm-row flex-column gap-3">
            <button className="btn btn-outline-dark" onClick={() => getProducts()}>
              all
            </button>
            {categoriesUI}
          </div>
          <div className="row justify-content-center">
            <div className="row mt-4 p-0">{productUI}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
