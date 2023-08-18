import { useEffect, useState } from "react";
import Login from "../Login/Login";
import Spotify from "../../util/Spotify";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "bootswatch/dist/slate/bootstrap.min.css";
import "./App.css";

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

  async function handleSavePlaylist(playlistName) {
    const trackIds = playlist.map((track) => track.id);
    await Spotify.savePlaylist(playlistName, trackIds);
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
      <Playlist playlist={playlist} handleSavePlaylist={handleSavePlaylist} />
    </div>
  );
}

export default App;
