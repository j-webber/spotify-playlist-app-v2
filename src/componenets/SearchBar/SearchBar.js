import { useEffect, useState } from "react";

export default function SearchBar(props) {
  const { search } = props;
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (searchInput) {
      search(searchInput);
    }
  }, [searchInput]);

  function handleChange(e) {
    setSearchInput(e.target.value);
  }

  return (
    <form>
      <input type="text" value={searchInput} onChange={handleChange} />
    </form>
  );
}
