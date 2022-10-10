import React from "react";
import Filtros from "./filters";
import Order from "./order";

export default function OrderFilt() {
  // Este es un componente que va a tener dentro los componentes de orden y los de filtros
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Filtros />
      </div>
      <div>
        <Order />
      </div>
    </div>
  );
}
