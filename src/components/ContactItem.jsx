import { CiCircleRemove } from "react-icons/ci";
import { BiEdit } from "react-icons/bi";
import styles from "./ContactItem.module.css";

function ContactItem({
  data: { name, lastName, phone, id },
  isChecked,
  handleCheckboxChange,
  deleteHandler,
  editHandler,
}) {
  return (
    <li key={id} className={styles.list}>
      <input
        className={styles.checkBox}
        type="checkbox"
        checked={isChecked}
        onChange={() => handleCheckboxChange(id)}
      />

      <p>{name}</p>
      <p>{lastName}</p>
      <p>{phone}</p>
      <button onClick={() => deleteHandler(id)} className={styles.button}>
        <CiCircleRemove className={styles.remove} />
      </button>
      <button onClick={() => editHandler(id)}>
        <BiEdit className={styles.edit} />
      </button>
    </li>
  );
}

export default ContactItem;
