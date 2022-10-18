import React, { useState } from "react";
import ByPrice from "./byPrice";

export default function Order() {
  var [state, setState] = useState(false);
  return (
    <>
      <button onClick={() => setState(state ? false : true)}>
        {state ? "<" : <div className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-blue-100 px-5 py-2 hover:shadow-lg tracking-wider text-red rounded-full hover:bg-green-50">ORDENAR</div>}
      </button>
      <div
        style={{ display: state ? "flex" : "none", flexDirection: "column" }}
      >
        <ByPrice />
      </div>
    </>
  );
}
