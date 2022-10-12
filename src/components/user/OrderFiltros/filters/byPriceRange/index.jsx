import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../../../../redux/action";

export default function ByPriceRange() {
  var dispatch = useDispatch();

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
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setState(state ? false : true)}
        style={{ marginBottom: state ? "50px" : "0" }}
      >
        {state ? "<" : "Price"}
      </button>
      <form
        onSubmit={(e) => onSub(e)}
        style={{
          display: state ? "flex" : "none",
          position: "absolute",
          top: "30px",
        }}
      >
        <input
          type="number"
          placeholder="Min"
          name="minPrice"
          onChange={(e) => onChan(e)}
          value={rango.minPrice}
          onClick={e => e.target.value? setRango({...rango,minPrice: ""}) : null}
        />
        <input
          type="number"
          placeholder="Max"
          name="maxPrice"
          onChange={(e) => onChan(e)}
          value={rango.maxPrice}
          onClick={e => e.target.value? setRango({...rango,maxPrice: ""}) : null}
        />
        <input type="submit" />
      </form>
    </div>
  );
}