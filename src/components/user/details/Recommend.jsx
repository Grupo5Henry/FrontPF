import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
function Recommend(props) {
  return (
    <div className="2xl:container 2xl:mx-auto">
      <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 text-center">
            Productos que también te puede gustar
          </h1>
        </div>
        <div>
          {/* {props.similarBrand.length > 0? props.similarBrand.map((e, i) => {
            return <h5 key ={i}>{e.name}</h5>
          }):null}
           */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8 md:mt-10">
          {props.similarBrand?.map((e, i) => (
            <div className="bg-gray-50 p-8">
                <Link to={`/home/detail/${e.id}`}>
              <div className="">
                  <h2 className="text-xl text-gray-600">{e.name}</h2>
                <p className="text-xl font-semibold text-gray-800 mt-2">
                  ${e.price}
                </p>
              </div>
              <div className="flex justify-center items-center mt-8 md:mt-24">
                <img className="" src={e.thumbnail} alt="" />
              </div>
                </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    similarBrand: state.similarBrand,
  };
}

export default connect(mapStateToProps, null)(Recommend);
