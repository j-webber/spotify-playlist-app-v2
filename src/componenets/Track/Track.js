export default function Track(props) {
  const { handleClick } = props;
  return (
    <a
      href="#"
      className="list-group-item list-group-item-action flex-column align-items-start active"
    >
      <div
        className="text-start mb-2 border-bottom pb-2"
        id={props.id}
        onClick={handleClick}
      >
        <h4 className="card-title">{props.title}</h4>
        <p className="card-text">
          {props.artist} | {props.album}
        </p>
      </div>
    </a>
  );
}
