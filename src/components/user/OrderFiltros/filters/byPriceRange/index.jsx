import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../../../../redux/action";

export default function ByPriceRange() {
  var dispatch = useDispatch();
  var {filter} = useSelector(state => state)

  var [state, setState] = useState(false);
  var [rango, setRango] = useState({ maxPrice: "", minPrice: "" });

  function onChan(e) {
    setRango({ ...rango, [e.target.name]: e.target.value });
  }

  function onSub(e) {
    e.preventDefault();
    // if(rango.maxPrice === "" && rango.minPrice === "") return alert("Pasar rango de precio")
    if(Number(rango.maxPrice) < Number(rango.minPrice)){
       setRango({
        minPrice: rango.maxPrice,
        maxPrice: rango.minPrice
      })
      return dispatch(updateFilter({
        minPrice: rango.maxPrice,
        maxPrice: rango.minPrice,
        page: 0
      }))
    }
    dispatch(updateFilter({ ...rango, page: 0 }));
  }

  return (
    <div style={{ position: "relative", margin:'3px'}}>
      <button
        onClick={() => setState(state ? false : true)}
        style={{ marginBottom: state ? "50px" : "0" }}
      >
        {state ? "<" : <div className= "transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-blue-100 px-5 py-2 hover:shadow-lg tracking-wider text-red rounded-full hover:bg-green-50">Rango de precios</div>}
      </button>
      <form
        onSubmit={(e) => onSub(e)}
        style={{
          display: state ? "flex" : "none",
          position: "absolute",
          gap:"5px",
          top: "30px",
          maxWidth:"100%",
        }}
      >
        <input
         style={{maxWidth:"40%",color: 'rgb(85, 29, 29)', borderRadius:'10px'}}
          type="number"
          placeholder="Min"
          name="minPrice"
          onChange={(e) => onChan(e)}
          value={rango.minPrice}
          onClick={e => e.target.value? setRango({...rango,minPrice: ""}) : null}
        />
        <input
         style={{maxWidth:"40%",color: 'rgb(85, 29, 29)', borderRadius:'10px'}}
         type="number"
          placeholder="Max"
          name="maxPrice"
          onChange={(e) => onChan(e)}
          value={rango.maxPrice}
          onClick={e => e.target.value? setRango({...rango,maxPrice: ""}) : null}
        />
        <input type="submit" style={{maxWidth:"20%"}}/>
      </form>
    </div>
  );
}