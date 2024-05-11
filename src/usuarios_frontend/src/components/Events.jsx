import { useCanister } from "@connect2ic/react";
import React, { useState } from "react";


const EventCreate = () => {
    const [usuarios_backend] = useCanister("usuarios_backend");
    const [loading, setLoading] = useState("");


    const saveEvent = async (e) => {
        e.preventDefault();
        const form = e.target
        const tipo = form.tipo.value;
        const lugar = form.lugar.value;

        setLoading("Loading...");

        await usuarios_backend.createEvent(tipo, lugar);
        setLoading("");

        {
            document.getElementById('btnUserList').click();
        }

        
    }

    
    return (
     
        <div className="row  mt-5">
            <div className="col-2"></div>
            <div className="col-8">
                {loading != "" 
                    ? 
                    <div className="alert alert-primary">{loading}</div>
                    :
                    <div></div>
                }
                <div className="card">
                    <div className="card-header">
                        Registrar Evento
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveEvent} style={{display:"inline"}} >
                        <div className="form-group">
                            <label htmlFor="lugar" >Lugar Evento</label>
                            <input type="text" className="form-control" id="lugar" placeholder="Aranjuez" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tipo" >Tipo de Evento</label>
                            <input type="text" className="form-control" id="tipo" placeholder="Robo" />
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="submit" className="btn btn-success" value="Agregar"/>  
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-2"></div>

        </div>
    )
  }
  
  
  export default EventCreate