const hostname = window.location.hostname;

export const API_URL =
  hostname === "localhost" || hostname === "127.0.0.1"
    ? "http://localhost:8181"
    : `${window.location.protocol}//${hostname.replace(
        /-\d+(?=\.)/,
        "-8181"
      )}`;

console.log("API_URL:", API_URL);