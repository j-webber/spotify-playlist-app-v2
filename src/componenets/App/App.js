import { useEffect, useState } from "react";
import Login from "../Login/Login";
import Spotify from "../../util/Spotify";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";

function App() {
  const [hasCode, setHasCode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setHasCode(() => Spotify.hasCode());
  }, []);

  async function search(query) {
    let results = await Spotify.search(query);
    setSearchResults(results.tracks.items);
  }

  function clearResults() {
    setSearchResults([]);
  }

  if (!hasCode) return <Login />;

  return (
    <div className="App">
      <h1>Hello!</h1>
      <SearchBar search={search} clearResults={clearResults} />
      <SearchResults searchResults={searchResults} />
    </div>
  );
}

export default App;
