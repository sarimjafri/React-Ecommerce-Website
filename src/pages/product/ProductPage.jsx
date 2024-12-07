import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";
import image_not_found from "../../assets/image_not_found.png"; // Ensure this file exists at this location
import { useLocation } from "react-router-dom";
import Recommendations from "../../components/Recommendations"; // Ensure this component exists and is correctly exported

export default function ProductPage(props) {
  let path = window.location.pathname.split("/");
  const id = parseInt(path[2]);
  const location = useLocation(); // Get the current location object

  const { addToCart, cartItems, endpoint } = useContext(ShopContext);
  const [product, setProduct] = useState([]);

  const thisEndpoint = endpoint + "/" + id;
  const cartItemAmount = cartItems.get(id);

  function getRecommended() {
    axios.get(thisEndpoint).then((response) => {
      setProduct(response.data);
    });
  }

  useEffect(() => {
    getRecommended();
  }, [location.key]);

  return (
    <div className="min-h-screen bg-gray-50">
      {product.price > 0 && (
        <div className="flex flex-col justify-center items-center px-4 py-10">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl">
            {/* Product Image */}
            <div className="flex justify-center items-center bg-gray-100 p-4">
              <img
                className="object-contain h-80 w-80 rounded-lg"
                alt={product.description}
                src={product.image}
                onError={(e) => {
                  e.target.src = image_not_found;
                }}
              />
            </div>
            {/* Product Details */}
            <div className="px-8 py-6 lg:w-2/3">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {product.productName}
              </h1>
              <h3 className="text-xl text-green-600 font-semibold mb-2">
                Price: ${product.price}.00
              </h3>
              <h4 className="text-md text-gray-500 mb-4">
                Category: {product.category}
              </h4>
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>
              <div className="flex">
                <button
                  onClick={() => addToCart(id)}
                  className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200 ease-in-out"
                >
                  Add To Cart {cartItemAmount > 0 && <>| {cartItemAmount}</>}
                </button>
              </div>
            </div>
          </div>
          <Recommendations id={id} />
        </div>
      )}
    </div>
  );
}
