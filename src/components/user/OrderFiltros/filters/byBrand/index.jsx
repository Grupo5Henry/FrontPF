import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../../../../redux/action";


export default function ByBrand({actual}){
    var brands = useSelector(state => state.brand)
   var dispatch = useDispatch()

    return (
        <>
            <select onChange={e => dispatch(updateFilter({brand: e.target.value, page: 0}))}>
                <option hidden>Brand</option>
                {actual? <option value={""}>All the brands</option> : null}
                {
                    brands.map((b,i) => <option key={i}>{b.brand}</option>)
                }
            </select>
        </>
    )
}