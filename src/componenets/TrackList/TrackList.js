import Track from "../Track/Track";

export default function TrackList(props) {
  const { searchResults } = props;

  return (
    <>
      {searchResults.map((result) => (
        <Track
          key={result.id}
          id={result.id}
          title={result.name}
          artist={result.artists[0].name}
          album={result.album.name}
        />
      ))}
    </>
  );
}
