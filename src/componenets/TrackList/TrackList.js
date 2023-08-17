import Track from "../Track/Track";

export default function TrackList(props) {
  const { trackList, handleClick } = props;

  return (
    <>
      {trackList.map((result) => (
        <Track
          key={result.id}
          id={result.id}
          title={result.name}
          artist={result.artists[0].name}
          album={result.album.name}
          handleClick={handleClick}
        />
      ))}
    </>
  );
}
