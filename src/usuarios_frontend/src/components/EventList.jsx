import { useCanister, useConnect } from "@connect2ic/react";
import React, { useEffect, useState } from "react";
import Home from './Home'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Events = () => {
  
  const [usersBackend] = useCanister("usuarios_backend");
  const {principal} = useConnect();
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState("");
  const [eventId, setEventId] = useState("");

  useEffect(() => {
    obtieneEventos();
    }, []);

  const obtieneEventos = async () => {
      setLoading("Loading...");
      try {
        var eventsRes = await usersBackend.readEvents();
        setEvents(eventsRes);   
        // usersRes.forEach((user, index) => {
        //   console.log("user" +user.nombre);
        // });   
        setLoading("");

      } catch(e) {
          console.log(e);
          setLoading(`Error happened fetching events list`);
      }

  }

  return(
    <>
    { principal 
      ? 
      <div className="row  mt-5">
        <div className="col">
          {loading != "" 
            ? 
              <div className="alert alert-primary">{loading}</div>
            :
              <div></div>
          }
          <div className="card">
            <div className="card-header">
              Lista de Eventos
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Lugar</th>
                    <th>Tipo</th>
                  </tr>
                </thead>
                <tbody id="tbody">
                  {events.map((event) => {
                    return (
                      <tr key={event.id}>
                        <td>{event.lugarEvento}</td>
                        <td>{event.tipoEvento}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>         
            </div>
          </div>
        </div>
                  
      </div>
      
    : 
      <Home />
    }
    </>
  )
}
  
  
export default Events