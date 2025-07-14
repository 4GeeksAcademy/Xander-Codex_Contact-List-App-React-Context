const AGENDA_NAME = "alexander";
const API_BASE = "https://playground.4geeks.com/contact/agendas";

export const goGetAgenda = async (dispatch) => { // Función para obtener la agenda, o crearla si no existe
  try {
    const res = await fetch(`${API_BASE}/${AGENDA_NAME}`);// Intenta obtener agenda por nombre
    if (!res.ok) { //Si no hay, la crea
      console.log("Agenda not found, creating it...");
      await createAgenda(dispatch);
      return;
    }

    const data = await res.json();//si existe obtiene datos del json

    dispatch({ // Actualiza el estado global con el slug de la agenda
      type: "set_agenda",
      payload: { agenda: data.slug },
    });

    await getContacts(dispatch); // Obtiene contactos asociados a esta agenda

  } catch (err) {
    console.error("Error getting agenda:", err);
  }
};

export const createAgenda = async (dispatch) => { // crea una nueva agenda.
  try {
    const res = await fetch(`${API_BASE}/${AGENDA_NAME}`, {
      method: "POST", // Llamada a POST para crear la agenda en la API
    });

    const data = await res.json(); // Convierte respuesta a JSON para leer datos
    console.log("Agenda creada:", data);

    dispatch({ // actualiza estado con el slug de la nueva agenda creada
      type: "set_agenda",
      payload: { agenda: data.slug },
    });

    await getContacts(dispatch); // Obtiene los contactos 

  } catch (err) {
    console.error("Error creating agenda:", err);
  }
};

export const getContacts = async (dispatch) => { //obtiene los contactos de la agenda
  try {
    const res = await fetch(`${API_BASE}/${AGENDA_NAME}/contacts`); // Fetch a la API para obtener la lista de contactos
    const data = await res.json();

    dispatch({ // Actualiza el estado global con la lista de contactos recibida
      type: "get_contacts",
      payload: { contacts: data.contacts },
    });

  } catch (err) {
    console.error("Error fetching contacts:", err);
  }
};

export const createContact = async (dispatch, payload) => { // crea un nuevo contacto en la agenda
  try {
    await fetch(`${API_BASE}/${AGENDA_NAME}/contacts`, {// llamada a POST con datos del nuevo contacto con formato JSON
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        address: payload.address,
        agenda_slug: AGENDA_NAME,
      }),
    });

    await getContacts(dispatch);

  } catch (err) {
    console.error("Error creating contact:", err);
  }
};

export const deleteContact = async (dispatch, id) => { //elimina contacto por ID
  try {
    const res = await fetch(`${API_BASE}/${AGENDA_NAME}/contacts/${id}`, { // Llamada de DELETE a la API para borrar contacto
      method: "DELETE",
    });

    if (res.ok) { // Si se elimina, refresca la lista de contactos
      await getContacts(dispatch);
    } else {
      console.error("Failed to delete contact:", res.status);
    }

  } catch (err) {
    console.error("Error deleting contact:", err);
  }
};

