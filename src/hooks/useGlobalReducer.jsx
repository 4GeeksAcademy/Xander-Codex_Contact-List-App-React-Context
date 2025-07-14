// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"  // Import the reducer and the initial state.
import { goGetAgenda, getContacts, createContact, deleteContact } from "../actions";

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext()

// Define a provider component that encapsulates the store and warps it in a context provider to 
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
    // Initialize reducer with the initial state.
    const [store, dispatch] = useReducer(storeReducer, initialStore())
    // Provide the store and dispatch method to all child components.
    const actions = { // funciones con dispatch incluido
        goGetAgenda: (payload) => goGetAgenda(dispatch, payload),
        getContacts: (payload) => getContacts(dispatch, payload),
        createContact: (payload) => createContact(dispatch, payload),
        deleteContact: (payload) => deleteContact(dispatch, payload),
    }
    return <StoreContext.Provider value={{ store, dispatch, ...actions }}>{children}</StoreContext.Provider> // Devuelve Provider con store y dispatch paras los componentes hijos.
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    const { dispatch, store, goGetAgenda, createContact, getContacts, deleteContact } = useContext(StoreContext) // Extrae el estado y funciones del contexto.
    return { dispatch, store, goGetAgenda, createContact, getContacts, deleteContact }; // Devuelve los valores necesarios para interactuar con el estado global.
}