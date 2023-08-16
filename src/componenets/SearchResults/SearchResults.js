export default function SearchResults(props) {
  const results = props.searchResults.map((result) => (
    <li key={result.id} id={result.id}>
      {result.name}
      <br />
      {result.artists[0].name}
    </li>
  ));
  return <ul>{results}</ul>;
}
