import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useState } from "react";

export const AddContact = () => {
  const navigate = useNavigate(); // Hook para redirigir al usuario después de agregar un contacto
  const { createContact } = useGlobalReducer(); // Extrae la función createContact del contexto global

  const [newContact, setNewContact] = useState({ // Estado local para guardar los datos del nuevo contacto
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => { // Función a ejecutar al cambiiar cualquier campo del formulario
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { // Función a ejecutar al enviar el formulario.
    e.preventDefault();
    await createContact(newContact);
    navigate("/");
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card p-4 FormWitdh" >
        <h2 className="text-center mb-4">Add a New Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Full Name" name="name" value={newContact.name} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <input type="text" className="form-control" placeholder="Address" name="address" value={newContact.address} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Phone" name="phone" value={newContact.phone} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email" name="email" value={newContact.email} onChange={handleChange} required />
          </div>
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary btn-lg"> Add Contact </button>
          </div>
        </form>
        <div className="text-start">
          <Link to="/" className="custom-link"> Or go back to contacts </Link>
        </div>
      </div>
    </div>
  );
};
