import Spotify from "../../util/Spotify";

export default function Login() {
  async function handleClick(e) {
    e.preventDefault();
    Spotify.logIn();
  }

  return (
    <div className="mt-4 row">
      <button onClick={handleClick} className="btn btn-secondary btn-lg">
        Login
      </button>
    </div>
  );
}
