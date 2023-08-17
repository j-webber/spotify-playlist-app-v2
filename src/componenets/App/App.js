import { useEffect, useState } from "react";
import Login from "../Login/Login";
import Spotify from "../../util/Spotify";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

function App() {
  const [hasCode, setHasCode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

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

  function filterSearchResults(selectedTrackId) {
    const selectedTrack = searchResults.filter(
      (track) => track.id === selectedTrackId
    );
    setPlaylist((prev) => [...prev, selectedTrack[0]]);
  }

  if (!hasCode) return <Login />;

  return (
    <div className="App">
      <h1>Hello!</h1>
      <SearchBar search={search} clearResults={clearResults} />
      <SearchResults
        searchResults={searchResults}
        addSelectedTrack={filterSearchResults}
      />
      <Playlist playlist={playlist} />
    </div>
  );
}

export default App;
