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

  function removeSelectedTrack(selectedTrackId) {
    const updatedPlaylist = playlist.filter(
      (track) => track.id !== selectedTrackId
    );
    setPlaylist(updatedPlaylist);
  }

  async function handleSavePlaylist(playlistName) {
    const trackIds = playlist.map((track) => track.id);
    await Spotify.savePlaylist(playlistName, trackIds);
  }

  return (
    <div className="App container-sm pt-5 text-center">
      <div className="row">
        <h1 className="">Spotify Playlist Maker</h1>
      </div>
      <div>
        <>
          <SearchBar search={search} clearResults={clearResults} />
          <div className="row mt-5 mb-5">
            <SearchResults
              searchResults={searchResults}
              addSelectedTrack={filterSearchResults}
            />
            <Playlist
              playlist={playlist}
              handleSavePlaylist={handleSavePlaylist}
              removeSelectedTrack={removeSelectedTrack}
            />
          </div>
        </>
      </div>
    </div>
  );
}

export default App;
