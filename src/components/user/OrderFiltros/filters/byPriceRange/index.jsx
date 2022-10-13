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
    dispatch(updateFilter({ ...rango, page: 0 }));
    setRango({ maxPrice: "", minPrice: "" });
  }

  return (
    <div style={{ position: "relative", margin:'3px'}}>
      <button
        onClick={() => setState(state ? false : true)}
        style={{ marginBottom: state ? "50px" : "0" }}
      >
        {state ? "<" : <div className="filter" >Rango de precios</div>}
      </button>
      <form
        onSubmit={(e) => onSub(e)}
        style={{
          display: state ? "flex" : "none",
          position: "absolute",
          top: "30px",
        }}
      >
        <input style={{borderRadius: '10px',borderBlockColor: '#ff30004f',margin: '3px'}}
          type="number"
          placeholder="Min"
          name="minPrice"
          onChange={(e) => onChan(e)}
          value={rango.minPrice}
        />
        <input style={{borderRadius: '10px',borderBlockColor: '#ff30004f',margin: '3px'}}
          type="number"
          placeholder="Max"
          name="maxPrice"
          onChange={(e) => onChan(e)}
          value={rango.maxPrice}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
