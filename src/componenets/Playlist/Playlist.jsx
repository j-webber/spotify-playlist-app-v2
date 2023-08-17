import TrackList from "../TrackList/TrackList";

export default function Playlist(props) {
  const { playlist } = props;

  return (
    <>
      <h1>Playlist</h1>
      <TrackList trackList={playlist} />
    </>
  );
}
