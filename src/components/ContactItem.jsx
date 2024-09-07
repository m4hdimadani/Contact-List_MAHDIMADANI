import { CiCircleRemove } from "react-icons/ci";

import styles from "./ContactItem.module.css"

function ContactItem({ data: { name, lastName, phone, id }, deleteHandler }) {
  return (
    <li key={id} className={styles.list}>
      <p>{name}</p>
      <p>{lastName}</p>
      <p>{phone}</p>
      <button onClick={() => deleteHandler(id)} className={styles.button}>
        <CiCircleRemove  className={styles.remove}/>
      </button>
    </li>
  );
}

export default ContactItem;
