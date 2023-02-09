import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { ERROR_MSG } from "../../config/constants";
import { auth, db } from "../../config/firebase";
import CookieService from "../services/cookie_service";

export default class SignupPageController {
  static async signup({ email, password, name, confirmPassword }) {
    try {
      if (name.length < 3) {
        toast.error("Invalid Name");
        return { status: false };
      }

      if (password !== confirmPassword) {
        toast.error("Passwords didn't match");
        return { status: false };
      }

      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName: name,
      });

      const doctorsRef = doc(db, "patients", res.user.email);
      await setDoc(doctorsRef, {
        email,
        password,
        name,
      });

      CookieService.setCookie({ name: "user", value: res.user });

      return { status: true };
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        toast.error("Account already exists. Please log in");
        return { status: false };
      }

      if (e.code === "auth/invalid-email") {
        toast.error("Invalid Email");
        return { status: false };
      }

      if (e.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters");
        return { status: false };
      }

      toast.error(ERROR_MSG);
      return { status: false };
    }
  }
}
