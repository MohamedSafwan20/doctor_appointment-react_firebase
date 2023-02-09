import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ERROR_MSG } from "../../config/constants";
import { auth, db } from "../../config/firebase";
import CookieService from "../services/cookie_service";

export default class SignupPageController {
  static async signup({
    email,
    password,
    name,
    department,
    fees,
    confirmPassword,
  }) {
    try {
      if (name.length < 3) {
        alert("Invalid Name");
        return { status: false };
      }

      if (department.length < 3) {
        alert("Invalid Department");
        return { status: false };
      }

      if (fees.includes("-")) {
        alert("Invalid Fees");
        return { status: false };
      }

      if (password !== confirmPassword) {
        alert("Passwords didn't match");
        return { status: false };
      }

      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName: name,
      });

      const doctorsRef = doc(db, "doctors", res.user.email);
      await setDoc(doctorsRef, {
        email,
        password,
        department,
        fees,
        name,
      });

      CookieService.setCookie({ name: "user", value: res.user });

      return { status: true };
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        alert("Account already exists. Please log in");
        return { status: false };
      }

      if (e.code === "auth/invalid-email") {
        alert("Invalid Email");
        return { status: false };
      }

      if (e.code === "auth/weak-password") {
        alert("Password should be at least 6 characters");
        return { status: false };
      }

      alert(ERROR_MSG);
      return { status: false };
    }
  }
}
