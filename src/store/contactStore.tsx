import { create } from "zustand";
import contacts from "../utils/data.json";
import { Contact } from "../utils/types";

interface ContactState {
    contacts: Contact[]
    addContact: (contact: Contact) => void
    updateContact: (contact: Contact) => void
    deleteContact: (contactID: string) => void
}

const useContactStore = create<ContactState>((set) => ({
    contacts: contacts,
    addContact: (contact: Contact) => set((state) => ({
        ...state,
        contacts: [...state.contacts, contact]
    })),
    updateContact: (contact: Contact) => set((state) => ({
        ...state,
        contacts: state.contacts
            .map((contact_ : Contact) => contact_.ID === contact.ID ? contact : contact_)
    })),
    deleteContact: (contactID: string) => set((state) => ({
        ...state,
        contacts: state.contacts
            .filter((contact: Contact) => contact.ID !== contactID)
    }))
}));

export default useContactStore;