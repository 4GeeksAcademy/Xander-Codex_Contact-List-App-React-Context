import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard.jsx";
import { useEffect } from "react";

export const Home = () => {// Extrae store y la acción goGetAgenda desde el contexto global
  const { store, goGetAgenda } = useGlobalReducer();

  useEffect(() => {
    goGetAgenda(); // llama a la acción que obtiene todos los contactos desde la API
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">My Contacts</h1>
      {store.contacts?.length > 0 ? ( //Renderiza lista de contactos. si hay 
        store.contacts.map((contact) => ( //si hay contactos en store.contacts, mapea cada uno para crear un ContactCard.
          <ContactCard key={contact.id} contact={contact} />//para evitar errores en el renderizado de listas en React.
        ))
      ) : (
        <h3 className="text-center">No Contacts</h3> //Mensaje si no hay contactos
      )}
    </div>
  );
};

