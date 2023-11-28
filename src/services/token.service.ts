
export default function authHeader() {
    let token = localStorage.getItem('user');
    console.log("auth: "+ token)
    if (token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
  }