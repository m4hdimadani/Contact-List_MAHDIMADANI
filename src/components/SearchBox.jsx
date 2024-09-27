import styles from "./SearchBox.module.css";

function SearchBox({ search, setSearch, searchHandler, resetContacts }) {
  const searchChangeHandler = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value === "") {
      resetContacts();
    }
  };

  return (
    <div className={styles.input}>
      <input
        type="text"
        placeholder="Search Title"
        value={search}
        onChange={searchChangeHandler}
      />
      <button
        onClick={() => {
          searchHandler();
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBox;
