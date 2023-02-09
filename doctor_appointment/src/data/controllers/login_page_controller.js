import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { ERROR_MSG } from "../../config/constants";
import { auth, db } from "../../config/firebase";
import CookieService from "../services/cookie_service";
export default class LoginPageController {
  static async login({ email, password }) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      const doctorSnapshot = await getDoc(doc(db, "doctors", email));

      if (doctorSnapshot.get("email") === undefined) {
        toast.error("Account not found");
        return { status: false };
      }

      CookieService.setCookie({ name: "user", value: res.user });

      return { status: true };
    } catch (e) {
      if (e.code === "auth/wrong-password") {
        toast.error("Wrong Password");
        return { status: false };
      }

      if (e.code === "auth/user-not-found") {
        toast.error("Account not found");
        return { status: false };
      }

      toast.error(ERROR_MSG);
      return { status: false };
    }
  }
}
