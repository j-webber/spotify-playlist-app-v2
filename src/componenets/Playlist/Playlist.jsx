import { useState } from "react";
import TrackList from "../TrackList/TrackList";

export default function Playlist(props) {
  const { playlist, handleSavePlaylist } = props;
  const [playlistName, setPlaylistName] = useState("");

  function handleChange(e) {
    setPlaylistName(e.target.value);
  }

  function handleClick() {
    if (!playlistName) {
      alert("Please enter playlist name!");
    } else {
      handleSavePlaylist(playlistName);
    }
  }

  return (
    <>
      <h1>Playlist</h1>
      <h2>Enter Playlist Name:</h2>
      <input type="text" value={playlistName} onChange={handleChange} />
      <TrackList trackList={playlist} />
      <button onClick={handleClick}>Save Playist</button>
    </>
  );
}
