import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter } from "../../../redux/action";
import Filtros from "./filters";
import Order from "./order";

export default function OrderFilt() {
  // Este es un componente que va a tener dentro los componentes de orden y los de filtros
  const dispatch = useDispatch();
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ maxWidth: "60%" }}>
        <Filtros />
        <button class="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-blue-100 px-5 py-2 hover:shadow-lg tracking-wider text-red rounded-full hover:bg-green-50" onClick={() => dispatch(resetFilter())}>
          Resetear filtro
        </button>
      </div>
      <div style={{ maxWidth: "40%" }}>
        <Order />
      </div>
    </div>
  );
}
