import useContactStore from "../store/contactStore";
import { TfiAgenda } from "react-icons/tfi";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEdit, MdEmail } from "react-icons/md";
import { Contact } from "../utils/types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const { contacts, deleteContact } = useContactStore();
    const [listOfContacts, setListOfContacts] = useState<Contact[]>(contacts)
    const [contactsSelected, setContactsSelected] = useState<string[]>([])

    useEffect(() => {
        setListOfContacts(contacts)
    }, [contacts])

    const filterContacts = (value: string) => setListOfContacts(
        contacts.filter(({ name, phone, email }) => 
            name.includes(value) || 
            phone.includes(value) || 
            email.includes(value)
        )
    )

    const addRemoveContactToDelete = (e: React.ChangeEvent<HTMLInputElement>, contactID: string) : void => {
        if (e.target.checked) {
            setContactsSelected([...contactsSelected, contactID])
            return;
        }
        setContactsSelected(contactsSelected.filter(contactSelectedID => contactSelectedID !== contactID))
    }

    const deleteAllContactsSelected = () => contactsSelected.forEach((contactID) => deleteContact(contactID))

    return (
        <main className="p-4 h-auto min-h-screen sm:p-8 bg-[#F9FBF2] flex items-center justify-center flex-col gap-5">
            <section className="w-full fixed top-0 sm:top-[50px] max-w-5xl overflow-x-auto bg-white shadow-lg rounded-lg p-4 sm:p-8">
                
                {/* ENCABEZADO */}
                <div className="flex flex-col max-h-[20vh] sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-xl font-bold">
                        <TfiAgenda /> <h3 className="text-[#0E1C36]">Agenda</h3>
                    </div>

                    <div className="relative w-full max-w-lg">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            onChange={e => filterContacts(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button onClick={deleteAllContactsSelected} className="flex justify-center hover:cursor-pointer items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                            <FaTrash /> <h2>Eliminar</h2>
                        </button>
                        <Link to="addContact">
                            <button className="flex justify-center items-center gap-2 px-4 py-2 hover:cursor-pointer bg-green-500 text-white rounded-lg hover:bg-green-600">
                                <FaPlus /> <h2>Añadir</h2>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* CONTENIDO */}
                <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[23px] max-h-[77vh] sm:max-h-[78vh] overflow-y-auto">
                    {listOfContacts.map((contact: Contact) => (
                        <div key={contact.ID} className="bg-[#D7F9FF] rounded-lg shadow-md p-4 mb-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-[#0E1C36] text-lg font-bold">{contact.name}</h2>
                                <input
                                    type="checkbox"
                                    onChange={e => addRemoveContactToDelete(e, contact.ID)}
                                    className="w-5 h-5 hover:cursor-pointer"
                                />
                            </div>
                            <p className="text-gray-600 flex items-center gap-2"><FaPhone className="text-red-500" /> {contact.phone}</p>
                            <p className="text-gray-600 flex items-center gap-2"><MdEmail /> {contact.email}</p>
                            <div className="flex gap-2 mt-2">
                                <Link to={`/editContact/${contact.ID}`}>
                                    <button className="flex items-center gap-2 px-4 hover:cursor-pointer py-1 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                        <MdEdit /> <h3>Editar</h3>
                                    </button>
                                </Link>
                                <button onClick={() => deleteContact(contact.ID)} className="flex items-center gap-2 hover:cursor-pointer px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                                    <FaTrash /> <h3>Eliminar</h3>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Home;
