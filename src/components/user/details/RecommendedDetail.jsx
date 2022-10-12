import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function RecommendedDetail() {
  let detail = useSelector((state) => state.detail);
  const suggest = detail?.suggested;
  detail = detail?.product;
  console.log(suggest);
  return (
    <div className="2xl:container 2xl:mx-auto">
      <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 text-center">
            Productos que tambien te puede gustar
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8 md:mt-10">
          <div className="bg-gray-50 p-8">
            <div className="">
              <h2 className="text-xl text-gray-600">Lounge Chair</h2>
              <p className="text-xl font-semibold text-gray-800 mt-2">$1200</p>
            </div>
            <div className="flex justify-center items-center mt-8 md:mt-24">
              <img
                className=""
                src="https://i.ibb.co/8403ZFZ/pexels-hormel-2762247-removebg-preview-2-1.png"
                alt="A chair with designed back"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendedDetail;
