import { useState } from "react";
import { v4 } from "uuid";
import { CiCirclePlus } from "react-icons/ci";

import ContactsList from "./ContactsList";
import styles from "./AddContact.module.css";
import SearchBox from "./SearchBox";

const inputs = [
  { type: "text", name: "name", placeholder: "Name" },
  { type: "text", name: "lastName", placeholder: "last Name" },
  { type: "number", name: "phone", placeholder: "Phone" },
];

function AddContact() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    phone: "",
  });
  const [search, setSearch] = useState("");

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const addHandler = () => {
    if (!contact.name || !contact.lastName || !contact.phone) {
      setAlert("please enter valid data");
      return;
    }
    setAlert("");
    const newContact = { ...contact, id: v4() };
    setContacts((contacts) => [...contacts, newContact]);
    setContact({ name: "", lastName: "", phone: "" });
  };
  const deleteHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  };

  const searchHandler = () => {
    if (search) {
      const newContact = contacts.filter((item) =>
        item.name.toLowerCase().includes(search)
      );
      setSearch("");
      setContacts(newContact);
    } else {
      setContacts(contacts);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {inputs.map((input, index) => (
          <input
            key={index}
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
            value={contact[input.name]}
            onChange={changeHandler}
          />
        ))}

        <button onClick={addHandler}>
          <CiCirclePlus className={styles.CiCirclePlus} />
        </button>
      </div>
      <SearchBox
        search={search}
        setSearch={setSearch}
        searchHandler={searchHandler}
      />
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
      <ContactsList contacts={contacts} deleteHandler={deleteHandler} />
    </div>
  );
}

export default AddContact;
