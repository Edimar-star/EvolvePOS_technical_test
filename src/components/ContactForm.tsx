import { useEffect, useState } from "react";
import { Contact } from "../utils/types";
import useContactStore from "../store/contactStore";
import { useNavigate } from "react-router-dom";

const ContactForm = ({ formType, contact_ } : { formType: "add" | "edit", contact_: Contact }) => {
    const store = useContactStore()
    const [contact, setContact] = useState<Contact>(contact_)
    const callback = formType === "add" ? store.addContact : store.updateContact
    const navigate = useNavigate()

    useEffect(() => {
        setContact(contact)
    }, [contact])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formType == "add") callback({ ...contact, ID: crypto.randomUUID() })
        else callback(contact)
        navigate("/")
    };

    return (
        <main className="flex items-center justify-center bg-[#F9FBF2] h-auto min-h-screen bg-gray-100">
            <div className="bg-[#D7F9FF] p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl text-[#0E1C36] font-bold mb-6">Añadir Nuevo Contacto</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        pattern="[a-zA-z]+[ a-zA-z]*"
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        className="p-3 bg-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Teléfono"
                        pattern="[0-9]+"
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        className="p-3 bg-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={contact.email}
                        pattern="([a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-]([\.]?[a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-])+@[a-zA-Z0-9]([^@&%$\/\(\)=?¿!\.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?)([,;]\s?([a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-]([\.]?[a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-])+@[a-zA-Z0-9]([^@&%$\/\(\)=?¿!\.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?))*[,;]?"
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        className="p-3 bg-white rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <div className="flex justify-around items-center gap-5">
                        <button
                            onClick={() => navigate("/")}
                            className="px-4 w-2xs py-3 hover:cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 w-2xs hover:cursor-pointer py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default ContactForm;