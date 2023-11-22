export default function SearchProducts({ sort, setSort, handleSortChange }) {
  return (
    <>
      <div className="search-wrapper">
        <div></div>
        <div className="search-bar">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search / Filter Products..."
              value={sort.q}
              onChange={(e) =>
                setSort((prevState) => ({
                  ...prevState,
                  q: e.target.value,
                }))
              }
            />
          </label>
          {sort.q.length > 0 && (
            <span
              onClick={() =>
                setSort((prevState) => ({
                  ...prevState,
                  q: "",
                }))
              }
              className="clear"
            >
              x
            </span>
          )}
        </div>
        <div className="sort-by">
          <select name="sortBy" value={sort.sortBy} onChange={handleSortChange}>
            <option value="">sort by latest</option>
            <option value="lowToHigh">price low to high</option>
            <option value="highToLow">price high to low</option>
          </select>
        </div>
      </div>
    </>
  );
}
