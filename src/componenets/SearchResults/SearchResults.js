import TrackList from "../TrackList/TrackList";

export default function SearchResults(props) {
  const { searchResults, addSelectedTrack } = props;

  function handleClick(e) {
    addSelectedTrack(e.currentTarget.id);
  }

  return (
    <div className="col">
      <div className="card text-white bg-primary mb-3">
        <div className="card-header">Song Results</div>
        <div className="card-body">
          <TrackList trackList={searchResults} handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
