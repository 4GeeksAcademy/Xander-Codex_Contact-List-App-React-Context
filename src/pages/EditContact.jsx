import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export const EditContact = () => { // Hook para redireccionar después de editar
  const navigate = useNavigate();
  const { id } = useParams(); // Extrae el id desde la URL
  const { store, dispatch, getContacts } = useGlobalReducer(); // Extrae store, dispatch y la acción getContacts desde el contexto global

  const [EditContact, setEditContact] = useState({ 
    name: "",
    address: "",
    phone: "",
    email: "",
    id: id, // guarda el ID para incluirlo en la solicitud PUT.
  });

  useEffect(() => {
    if (store.contacts.length > 0) { // Solo busca si ya hay contactos cargados
      const foundContact = store.contacts.find( // Encuentra el contacto por ID
        (c) => c.id === parseInt(id)
      );
      if (foundContact) {
        setEditContact(foundContact); // Carga datos al estado local
      }
    }
  }, [store.contacts, id]); // Se ejecuta cuando cambian los contactos o el ID

  const handleChange = (e) => {
    setEditContact({
      ...EditContact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitContact = async (e) => { // Previene recarga de página
    e.preventDefault();
    await fetch( // Envía datos actualizados al backend
      `https://playground.4geeks.com/contact/agendas/alexander/contacts/${EditContact.id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: EditContact.name,
          phone: EditContact.phone,
          email: EditContact.email,
          address: EditContact.address,
        }),
      }
    );
    getContacts(dispatch); // actualiza  lista de contactos en el estado global
    navigate("/"); // Redirige el usuario a la lista de contactos
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 FormWitdh">
        <h2 className="mb-4 text-center">Edit Contact</h2>
        <form onSubmit={handleSubmitContact}>
          <div className="mb-3">
            <label className="form-label"> Full Name: </label>
            <input type="text" className="form-control" name="name" value={EditContact.name} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="form-label"> Address: </label>
            <input type="text" className="form-control" name="address" value={EditContact.address} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone: </label>
            <input type="text" className="form-control" name="phone" value={EditContact.phone} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label"> Email: </label>
            <input type="email" className="form-control" name="email" value={EditContact.email} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3"> Edit Contact </button>
        </form>
        <div className="text-start">
          <Link to="/" className="custom-link"> Or go back to contacts </Link>
        </div>
      </div>
    </div>
  );
};
