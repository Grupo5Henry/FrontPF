import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../../../../../redux/action";


export default function ByModel({actual}){
    var dispatch = useDispatch()
    var models = useSelector(state => state.model)
    return (
        <>
            <select onChange={e => dispatch(updateFilter({model: e.target.value}))}>
                <option hidden>Model</option>
                {actual? <option value={""}>All the models</option> : null}
                    {
                        models.map((m,i)  => <option key={i}>{m.model}</option>)
                    }
            </select>
        </>
    )
}