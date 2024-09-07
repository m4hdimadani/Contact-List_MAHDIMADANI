import { AiOutlineFrown } from "react-icons/ai";

import ContactItem from "./ContactItem";
import styles from "./ContactList.module.css"

function ContactsList({ contacts, deleteHandler }) {
  return (
    <div className={styles.container}>
      <h3>Contact List</h3>
      {contacts.length ? (
        <ul>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              data={contact}
              deleteHandler={deleteHandler}
            />
          ))}
        </ul>
      ) : (
        <div className={styles.NoContact}>
          <AiOutlineFrown className={styles.icon}/>
          <p>No Contact Yet</p>
        </div>
      )}
    </div>
  );
}

export default ContactsList;
