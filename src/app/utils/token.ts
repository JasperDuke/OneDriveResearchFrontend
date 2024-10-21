export function storeTokenWithExpiration(token: string, expiresIn: number) {
  const now = new Date();
  const expirationTime = now.getTime() + expiresIn * 1000;

  // Store both the token and the expiration time in localStorage
  localStorage.setItem("driveToken", token);
  localStorage.setItem("driveTokenExpiration", expirationTime.toString());
}

export function isTokenValid() {
  const token = localStorage.getItem("driveToken");
  const expiration = Number(localStorage.getItem("driveTokenExpiration"));

  if (!token || !expiration) {
    return false; // No token or expiration found
  }

  const now = new Date().getTime();

  // Check if the token is expired
  if (now > expiration) {
    localStorage.removeItem("driveToken");
    localStorage.removeItem("driveTokenExpiration");
    return false; // Token expired
  }

  return true; // Token is valid
}

export function getToken() {
  if (isTokenValid()) {
    return localStorage.getItem("driveToken");
  } else {
    console.log("Token has expired or does not exist");
    return null; // Token is not valid
  }
}
