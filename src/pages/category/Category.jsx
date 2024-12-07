import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";
import Product from "../home/Product";
import { useLocation } from "react-router-dom";

export default function Category() {
  let location = useLocation();
  let path = location.pathname.split("/");
  const category = path[2];

  const { categoriesEndpoint } = useContext(ShopContext);
  const [product, setProduct] = useState([]);

  const thisEndpoint = categoriesEndpoint + "/" + category;

  useEffect(() => {
    axios.get(thisEndpoint).then((response) => {
      setProduct(response.data);
    });
  }, [location, thisEndpoint]);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center px-4 py-12">
        {/* Category Name Section */}
        <div className="relative mb-10 text-center">
          <h1 className="font-extrabold text-5xl text-gray-800 leading-tight mb-4 transform scale-110 transition duration-500 ease-in-out hover:scale-125 hover:text-green-500 pt-3">
            {category}
          </h1>
          <div className="absolute inset-0 bg-gray-200 opacity-40 rounded-full transform scale-125 animate-pulse"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-screen-xl">
          {product.map((item) => (
            <Product key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
