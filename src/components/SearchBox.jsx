import styles from "./SearchBox.module.css"

function SearchBox({ search, setSearch, searchHandler }) {
  
  return (
    <div className={styles.input}>
      <input
        type="text"
        placeholder="Search Title"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
      />
      <button onClick={() =>{searchHandler()}}>Search</button>
    </div>
  );
}

export default SearchBox;
