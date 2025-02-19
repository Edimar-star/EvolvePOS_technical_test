import { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm";
import useContactStore from "../store/contactStore";
import { Contact } from "../utils/types";
import { useNavigate, useParams } from "react-router-dom";

const EditContact = ({}) => {
    const navigate = useNavigate()
    const { getContact } = useContactStore()
    const { contactID = "" } = useParams()
    const [contact, setContact] = useState<Contact | undefined>(undefined)

    useEffect(() => {
        const foundContact = getContact(contactID);
        if (!foundContact) {
            navigate("/")
        } else {
            setContact(foundContact)
        }
    }, [contactID, getContact, navigate])

    if (!contact) return null;

    return <ContactForm formType="edit" contact_={contact} />
}

export default EditContact