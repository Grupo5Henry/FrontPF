import React from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../../../../redux/action";


export default function ByPrice(){
    var dispatch = useDispatch()
    return (
        <>
            <select onChange={e => dispatch(updateFilter({order: e.target.value, page: 0}))}>
                <option hidden>Price</option>
                <option>ASC</option>
                <option>DESC</option>
            </select>
        </>
    )
}