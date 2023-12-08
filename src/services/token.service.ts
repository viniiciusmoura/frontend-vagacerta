
export default function authHeader() {
    let token = localStorage.getItem('user');

    if (token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
  }