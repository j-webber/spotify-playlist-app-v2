import TrackList from "../TrackList/TrackList";

export default function SearchResults(props) {
  const { searchResults, addSelectedTrack } = props;

  function handleClick(e) {
    addSelectedTrack(e.currentTarget.id);
  }

  return (
    <>
      <h1>Results</h1>
      <TrackList trackList={searchResults} handleClick={handleClick} />
    </>
  );
}
