// auth.js

export function storeToken(token) {
    const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    const expiryTime = tokenPayload.exp * 1000; // Convert expiry time to milliseconds
  
    localStorage.setItem('token', token);
    localStorage.setItem('expiryTime', expiryTime);
  }
  
  export function isTokenExpired() {
    const expiryTime = localStorage.getItem('expiryTime');
    if (!expiryTime) {
      return true;
    }
    return Date.now() > expiryTime;
  }
  
  export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryTime');
  }  