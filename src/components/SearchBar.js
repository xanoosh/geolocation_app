const SearchBar = ({ value, change, submit }) => {
  return (
    <div className="searchbar-container">
      <form onSubmit={submit}>
        <input
          type="text"
          value={value}
          onChange={change}
          placeholder="type ip or url"
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default SearchBar;
