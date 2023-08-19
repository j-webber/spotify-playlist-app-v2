import { useState } from "react";
import TrackList from "../TrackList/TrackList";

export default function Playlist(props) {
  const { playlist, handleSavePlaylist, removeSelectedTrack } = props;
  const [playlistName, setPlaylistName] = useState("");

  function handleChange(e) {
    setPlaylistName(e.target.value);
  }

  function handleButtonClick() {
    if (!playlistName) {
      alert("Please enter playlist name!");
    } else {
      handleSavePlaylist(playlistName);
    }
  }

  function handleClick(e) {
    removeSelectedTrack(e.currentTarget.id);
  }

  return (
    <div className="col">
      <div className="card text-white bg-primary mb-3">
        <div className="card-header">Playlist</div>
        <div className="card-body">
          <TrackList trackList={playlist} handleClick={handleClick} />
        </div>
      </div>
      <div class="input-group mb-3">
        <input
          value={playlistName}
          onChange={handleChange}
          type="text"
          class="form-control"
          placeholder="Playlist name"
        />
        <button
          onClick={handleButtonClick}
          class="btn btn-primary"
          type="button"
          id="button-addon2"
        >
          Save Playlist
        </button>
      </div>
    </div>
  );
}
