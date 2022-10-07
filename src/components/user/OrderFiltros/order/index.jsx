import React, { useState } from "react";
import ByPrice from "./byPrice";

export default function Order() {
  var [state, setState] = useState(false);
  return (
    <>
      <button onClick={() => setState(state ? false : true)}>
        {state ? "<" : "ORDENAR"}
      </button>
      <div
        style={{ display: state ? "flex" : "none", flexDirection: "column" }}
      >
        <ByPrice />
      </div>
    </>
  );
}
