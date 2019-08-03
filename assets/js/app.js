var params = new URLSearchParams();
params.append("client_id", "");
params.append("redirect_uri", "http://localhost:8080/");

console.log(params.toString());

// GET https://accounts.spotify.com/authorize?client_id=8eb9c5f7f3b048bc9184193d33afdc96&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F
// client_id=&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F

// next step - anchor token
