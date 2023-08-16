import Spotify from "../../util/Spotify";

export default function Login() {
  async function handleClick(e) {
    e.preventDefault();
    Spotify.logIn();
  }

  return <button onClick={handleClick}>Login</button>;
}
