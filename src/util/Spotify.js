const clientId = "e7cd7b8178204acab699f7e180cb52d8"; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
let accessToken;

const Spotify = {
  hasCode() {
    return code ? true : false;
  },
  logIn() {
    redirectToAuthCodeFlow(clientId);
  },
  async getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      const verifier = localStorage.getItem("verifier");

      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", "http://localhost:3000");
      params.append("code_verifier", verifier);

      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params,
        });
        const { access_token } = await response.json();
        accessToken = access_token;
        return accessToken;
      } catch (error) {
        console.error(error);
      }
    }
  },
  async search(query) {
    const accessToken = await Spotify.getAccessToken();
    const params = new URLSearchParams({
      q: query,
      type: "track",
    });
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?${params}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.status);
      console.log(error.message);
    }
  },
  async savePlaylist(playlistName, trackIds) {
    const accessToken = await Spotify.getAccessToken();
    let userId;
    let playlistId;
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const data = await response.json();
      userId = data.id;
      console.log("got user data!");
    } catch (error) {
      console.log(error.status);
      console.log(error.message);
    }
    try {
      const body = JSON.stringify({
        name: playlistName,
      });

      const response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
          body: body,
        }
      );
      const data = await response.json();
      playlistId = data.id;
      console.log("created playlist!");
    } catch (error) {
      console.log(error);
    }
    try {
      console.log(trackIds);
      const uris = trackIds.map((id) => `spotify:track:${id}`);
      const body = JSON.stringify({
        uris: uris,
      });
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
          body: body,
        }
      );
      if (response.ok) {
        alert("Success!");
      } else {
        const data = await response.json();
        console.log(data.error);
      }
    } catch (error) {
      console.log(error.status);
      console.log(error.message);
    }
  },
};

async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:3000");
  params.append(
    "scope",
    "playlist-modify-private playlist-modify-public user-read-private user-read-email"
  );
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default Spotify;
