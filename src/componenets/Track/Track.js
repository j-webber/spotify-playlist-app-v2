export default function Track(props) {
  return (
    <div id={props.id}>
      <p>{props.title}</p>
      <p>
        {props.artist} | {props.album}
      </p>
    </div>
  );
}
