import { useState } from "react";
import { v4 } from "uuid";
import { CiCirclePlus } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";

import ContactsList from "./ContactsList";
import styles from "./AddContact.module.css";
import SearchBox from "./SearchBox";
import inputs from "../service/server";

function AddContact() {
  const [contacts, setContacts] = useState([]);
  const [originalContacts, setOriginalContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    phone: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
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
    if (isEditMode) {
      setContacts((prevContacts) =>
        prevContacts.map((item) =>
          item.id === contact.id ? { ...contact } : item
        )
      );
      setOriginalContacts((prevContacts) =>
        prevContacts.map((item) =>
          item.id === contact.id ? { ...contact } : item
        )
      );
      setIsEditMode(false);
    } else {
      const newContact = { ...contact, id: v4() };
      setContacts((contacts) => [...contacts, newContact]);
      setOriginalContacts((originalContacts) => [
        ...originalContacts,
        newContact,
      ]);
    }
    setContact({ name: "", lastName: "", phone: "" });
  };

  const deleteHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
    setOriginalContacts(newContacts);
  };

  const editHandler = (id) => {
    const editContact = contacts.find((contact) => contact.id === id);
    if (editContact) {
      setContact({ ...editContact });
      setIsEditMode(true);
    }
  };

  const searchHandler = () => {
    if (search) {
      const newContactSearch = originalContacts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setContacts(newContactSearch);
    }
  };
  const resetContacts = () => {
    setContacts(originalContacts);
  };

  const handleCheckboxChange = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((contact) => contact !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const deleteSelectedContacts = () => {
    const newContacts = contacts.filter(
      (contact) => !selectedContacts.includes(contact.id)
    );
    setAlert(`${selectedContacts.length} removed contact`);
    setContacts(newContacts);
    setSelectedContacts([]);
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
          {isEditMode ? (
            <CiEdit className={styles.CiCirclePlus} />
          ) : (
            <CiCirclePlus className={styles.CiCirclePlus} />
          )}
        </button>
      </div>
      <SearchBox
        search={search}
        setSearch={setSearch}
        searchHandler={searchHandler}
        resetContacts={resetContacts}
      />
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>

      {selectedContacts.length > 0 && (
        <button
          onClick={deleteSelectedContacts}
          className={styles.deleteSelected}
        >
          {`remove ${selectedContacts.length} `}
        </button>
      )}

      <ContactsList
        contacts={contacts}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
        selectedContacts={selectedContacts}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
}

export default AddContact;
