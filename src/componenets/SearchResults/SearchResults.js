import TrackList from "../TrackList/TrackList";

export default function SearchResults(props) {
  const { searchResults } = props;

  return (
    <>
      <h1>Results</h1>
      <TrackList searchResults={searchResults} />
    </>
  );
}
