import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import image_not_found from "../../assets/image_not_found.png";

export default function Product(props) {
  const { id, price, description, image, productName } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemAmount = cartItems.get(id);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-between w-full max-w-xs mx-auto transition transform hover:scale-105 hover:shadow-lg">
      <Link className="w-full h-80" to={"/product/" + id}>
        <img
          className="object-cover w-full h-full rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
          alt={description}
          src={image}
          onError={(e) => {
            e.target.src = image_not_found;
          }}
        />
      </Link>
      <h1 className="text-xl font-semibold text-center mt-4 text-gray-800 hover:text-green-600">
        {productName}
      </h1>
      <h3 className="text-center text-lg text-gray-700 mt-1">${price}.00</h3>
      <div className="flex justify-center mt-4 w-full">
        <button
          onClick={() => addToCart(id)}
          className="px-8 py-3 text-white bg-green-500 hover:bg-green-600 border-2 border-green-500 rounded-full focus:outline-none transition duration-200 transform hover:scale-105"
        >
          Add To Cart
          {cartItemAmount > 0 && (
            <span className="ml-2 text-sm">| {cartItemAmount}</span>
          )}
        </button>
      </div>
    </div>
  );
}
