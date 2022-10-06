import React, { useState } from "react";
import { useSelector } from "react-redux";


export default function DirectionForm(){
    // var {user} = useSelector(state => state) ???????
    var [state,setState] = useState(true)
    var [direction,setDirection] = useState({
        provincia_estado: "",
        calle: "",
        line1: ""
    })
    var [porDefecto,setPorDefecto] = useState(false)

    function onCha(e){
        setDirection({
            ...direction,
            [e.target.name]:e.target.value
        })
    }
    function onSub(e){
        e.preventDefault()

        state? (
            alert("Voy a usar la ubicacion por defecto y tengo que hacer la orden de compra")
        ) : (
            !direction.calle || !direction.provincia_estado? (
                alert("Complete los campos pedidos")
            ) :
            porDefecto? (
                alert("Tengo que modificar la shipping address y hacer la orden de compra")
            ) : (
                alert("Tengo que hacer la orden de compra con la nueva ubicacion pero no alterar la ubicacion por defecto")
            )
        )
    }
    return (
        <div style={{display:"flex",flexDirection:"column",gap: "5px",alignItems:"center"}}>
            <h1 style={{color:"black",fontSize:"35px",fontWeight:"bold"}}>Dirección de Envio</h1>
            <select onChange={(e) => {setState(e.target.value);if(e.target.value){setPorDefecto(false)}}} style={{width:"90%"}}>
                <option value={true}>{/* {user.defaultShippingAddress} */}Calle falsa 123</option>
                <option value={""}>Otra dirección</option>
            </select>
            {
                !state? (
                    <div style={{display:"flex", flexDirection: "column",alignItems:"center",width:"90%",marginTop:"10px"}}>
                        <form onSubmit={onSub} style={{display:"flex", flexDirection: "column",width:"90%"}}>
                            <div style={{display:"flex", flexDirection: "column",width:"100%",margin:"3px"}}>
                                <label>Provincia/Estado</label>
                                <input style={direction.provincia_estado? null : {border:"solid red 2px"}} type="text" placeholder="Ej: Buenos Aires" value={direction.provincia_estado} onChange={onCha} name="provincia_estado"/>
                                {
                                    direction.provincia_estado? null : <span style={{color:"red",fontSize:"13px"}}>Complete este campo</span>
                                }
                            </div>
                            <div style={{display:"flex", flexDirection: "column",width:"100%",margin:"3px"}}>
                                <label>Calle</label>
                                <input style={direction.calle? null : {border:"solid red 2px"}} type="text" placeholder="Ej: San Martin 2900" value={direction.calle} onChange={onCha} name="calle"/>
                                {
                                    direction.calle? null : <span style={{color:"red",fontSize:"13px"}}>Complete este campo</span>
                                }
                            </div>
                            <div style={{display:"flex", flexDirection: "column",width:"100%",margin:"3px"}}>
                                <label>¿Alguna aclaración?</label>
                                <input type="text" placeholder="Ej: Casa roja, entre hospital y restaurante" value={direction.line1} onChange={onCha} name="line1"/>
                            </div>
                            <button className="datepicker-footer-btn">Continuar</button>
                        </form>
                        <div>
                            <span style={{margin:"5px"}}>¿Quieres agregar esta dirección como nueva dirección por defecto?</span>
                            <input type="checkbox" onClick={() => setPorDefecto(porDefecto? false : true)}/>
                        </div>
                    </div>
                ) : (
                    <button onClick={onSub} className="datepicker-footer-btn" style={{width:"90%",position: "absolute",bottom:"0"}}>Continuar</button>
                )
            }
        </div>
    )
}