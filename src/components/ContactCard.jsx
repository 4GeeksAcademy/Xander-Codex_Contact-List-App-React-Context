import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { deleteContact } from "../actions.jsx";
import React, { useState } from "react";

export const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer(); // Hook para acceder al dispatch global
  const [showModal, setShowModal] = useState(false); // Estado para mostrar u ocultar el modal

  const handleDelete = () => {
    deleteContact(dispatch, contact.id); // Llama a la función para eliminar el contacto
    setShowModal(false); // Cierra el modal
  };

  return (
    <>
      <div className="contact-card-container d-flex justify-content-center contacto">
        <div className="contact-card">
          <div>
            <img
              src="https://i.pinimg.com/originals/bd/4d/84/bd4d843a6081db611a8302c86a8ff5f8.jpg"
              alt="avatar"
              className="contact-avatar"
            />
          </div>
          <div className="contact-info">
            <h5 className="mb-1">{contact.name}</h5>
            <p className="small mb-1 text-muted">
              <i className="fa-solid fa-location-dot icons"></i> {contact.address}
            </p>
            <p className="small mb-1 text-muted">
              <i className="fa-solid fa-phone-flip icons"></i> {contact.phone}
            </p>
            <p className="small mb-0 text-muted">
              <i className="fa-solid fa-envelope icons"></i> {contact.email}
            </p>
          </div>
          <div className="contact-buttons">
            <Link to={`/update/${contact.id}`} className="EditPencil">
              <i className="fa-solid fa-pencil"></i>
            </Link>
            <button onClick={() => setShowModal(true)} className="TrashDelete">
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <p>Are you sure you want to delete the contact: <strong>{contact.name}</strong>?</p>
                <div className="d-flex gap-2 justify-content-center">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}> Cancel </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}> Delete </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

