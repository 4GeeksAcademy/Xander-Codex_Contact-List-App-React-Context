export const initialStore = () => {
  return {
    agenda: null,
    contacts: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_agenda":
      return {
        ...store,
        agenda: action.payload.agenda,
      };
    case "get_contacts":
      return {
        ...store,
        contacts: action.payload.contacts,
      };
    default:
      throw Error("Unknown action.");
  }
}
