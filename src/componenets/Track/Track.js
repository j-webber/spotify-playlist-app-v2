export default function Track(props) {
  const { handleClick } = props;
  return (
    <div id={props.id} onClick={handleClick}>
      <p>{props.title}</p>
      <p>
        {props.artist} | {props.album}
      </p>
    </div>
  );
}
