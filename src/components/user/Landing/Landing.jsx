import React from "react";
import Carrusel from "../Carrusel/Carrusel";

/* Install pure-react-carousel using -> npm i pure-react-carousel */

export default function Landing() {
  return (
    <div className="py-20">
      <div className="relative overflow-hidden bg-white">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48 ">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Lo nuevo en tecnologia esta finalmente aqui
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                This year, our new summer collection will shelter you from the
                harsh elements of a world that doesn't care if you live or die.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* <!-- Decorative image grid --> */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://i.blogs.es/57cf85/xiaomimitvp1ap/450_1000.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://sony.scene7.com/is/image/sonyglobalsolutions/TV-column-static-image-desktop%20and%20mobile-Entertainment%20all%20in%20one%20place-714x439?$ColumnStatic$&fmt=png-alpha"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://i0.wp.com/revistadiners.com.co/wp-content/uploads/2020/01/computadores_1200x800.jpg?fit=1024%2C683&ssl=1"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://www.alkosto.com/medias/017817703277-001-750Wx750H?context=bWFzdGVyfGltYWdlc3wzMzc4OXxpbWFnZS9qcGVnfGltYWdlcy9oNGYvaDgzLzkwNjU0MTU4Njg0NDYuanBnfGQ0YzA0YzU3ZTRhNTc4ODNhMzk1Y2JkN2RhMDNkZDU1MWRkYTY3NGI4YjQ5NmQ5Y2U3MTUzNDQyYWNkNWYwODc"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/6CJPKMIJVZBXVIJH77NPKZJZZY.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://e00-co-marca.uecdn.es/claro/assets/multimedia/imagenes/2021/12/22/16402116205337.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://static.wixstatic.com/media/68fa0b_8e9d7263354b40bc87e401eda0b5f683~mv2.jpg/v1/fill/w_593,h_356,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/pc_para_streaming_gaming.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="/home"
                  class="inline-block rounded-md border border-transparent bg-blue-500 py-3 px-8 text-center font-medium text-white hover:bg-blue-700"
                >
                  Descubre aqui
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Container for demo purpose --> */}
      <Carrusel />
    </div>
  );
}
