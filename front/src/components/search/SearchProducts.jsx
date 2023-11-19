export default function SearchProducts({ q, setQ }) {
  return (
    <>
      <div className="search-wrapper">
        <label htmlFor="search-form">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="search-input"
            placeholder="Search / Filter Products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        {q.length > 0 && (
          <div onClick={() => setQ("")} className="clear">
            x
          </div>
        )}
      </div>
    </>
  );
}
