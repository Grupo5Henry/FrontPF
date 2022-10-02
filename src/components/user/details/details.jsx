import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailProduct } from "../../../redux/action";
import Comment from "../comment/comment";

// Detalle del Producto

const Details = () => {

  const details = useSelector(state => state.detail);
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(()=>{
    dispatch(detailProduct(id))
  },[dispatch, id])
  // console.log(details, "Details")

  return (
    <div>
      
      <style>
        @import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);
      </style>
      <div class="min-w-screen min-h-screen flex  p-5 lg:p-10 overflow-hidden relative">
        <div class="w-screen max-w-7xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
          <div class="md:flex items-center -mx-10">
            <div class="w-full md:w-1/2 px-10 mb-10 md:mb-0">
              <div class="relative">
                <img
                  src={details.thumbnail}
                  class="w-full relative z-10"
                  alt=""
                />
                <div class="border-4 border-black-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
              </div>
            </div>
            <div class="w-full md:w-1/2 px-10">
              <div class="mb-10">
                <div class='flex flex-row justify-between' >
                  <h1 class="font-bold uppercase text-2xl mb-5">
                    {details.name}
                  </h1>
                  <button class='font-bold uppercase text-2xl mb-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-pink-500" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <p class="text-sm">
                  {details.description}
                </p>
              </div>
              <div>
                <div class="inline-block align-bottom mr-5">
                  <span class="text-2xl leading-none align-baseline">$</span>
                  <span class="font-bold text-3xl leading-none align-baseline">
                    {details.price}
                  </span>
                </div>
              </div>
              <div class='mt-2'>
                <div class="inline-block align-bottom mr-5">
                  <span class="text-2xl leading-none align-baseline">brand   </span>
                  <span class="font-bold text-3xl leading-none align-baseline">
                    {details.brand}
                  </span>
                </div>
              </div>
              <div class="inline-flex items-center mt-5">
                <button
                  class="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <div class="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none" >
                  2
                </div>
                <button
                  class="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div class='mt-7'>
                <div class="inline-block align-bottom">
                  <button class="bg-[#4F46E5] opacity-75 hover:opacity-100 text-gray-400 hover:text-gray-600 rounded-full px-10 py-2 font-semibold">
                    Buy Now
                  </button>
                </div>
                <div class="inline-block align-bottom">
                  <button class="bg-white-300 opacity-75 hover:opacity-100 text-gray-400 hover:text-gray-600 rounded-full px-10 py-2 font-semibold">
                    Carry to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* {<------------------ comentarios ------------------------>} */}
          <Comment/>
          {/* {<------------------------------------------>} */}
        </div>
      </div>
      <div class="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div></div>
      </div>
    </div>
  );
};

export default Details;
