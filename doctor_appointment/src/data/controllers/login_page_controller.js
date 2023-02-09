import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import CookieService from "../services/cookie_service";
import { ERROR_MSG } from "../../config/constants";
export default class LoginPageController {
  static async login({ email, password }) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      CookieService.setCookie({ name: "user", value: res.user });

      return { status: true };
    } catch (e) {
      if (e.code === "auth/wrong-password") {
        alert("Wrong Password");
        return { status: false };
      }

      if (e.code === "auth/user-not-found") {
        alert("Account not found");
        return { status: false };
      }

      alert(ERROR_MSG);
      return { status: false };
    }
  }
}
