export default class CookieService {
  static setCookie({ name, value }) {
    document.cookie = name + "=" + JSON.stringify(value) + "; path=/";
  }

  static getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0)
        return JSON.parse(c.substring(nameEQ.length, c.length));
    }

    return null;
  }

  static deleteCookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
}
