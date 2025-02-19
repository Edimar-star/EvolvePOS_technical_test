import ContactForm from "../components/ContactForm";

const AddContact = ({}) => {
    return <ContactForm formType="add" contact_={{ ID: "", name: "", phone: "", email: "" }} />
}

export default AddContact