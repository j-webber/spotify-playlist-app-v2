import { useEffect, useState } from "react";

export default function SearchBar(props) {
  const { search, clearResults } = props;
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (searchInput) {
      search(searchInput);
    } else {
      clearResults();
    }
  }, [searchInput]);

  function handleChange(e) {
    setSearchInput(e.target.value);
  }

  return (
    <div className="row">
      <div className="form-group col-8 text-start mx-auto">
        <label for="search" className="col-form-label col-form-label-lg mt-4">
          Search for song
        </label>
        <input
          className="form-control form-control-lg"
          type="text"
          value={searchInput}
          onChange={handleChange}
          id="serach"
          placeholder="What song do you want to add?"
        />
      </div>
    </div>
  );
}
