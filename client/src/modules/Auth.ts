class Auth {

  static authenticateUser(token: any) {
    localStorage.setItem('token', token);
    console.log("User auth with token: " + token);
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

}

export default Auth;

