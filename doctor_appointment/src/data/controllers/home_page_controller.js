import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { ERROR_MSG } from "../../config/constants";
import { auth, db } from "../../config/firebase";
import CookieService from "../services/cookie_service";
export default class HomePageController {
  static async fetchAppointments() {
    try {
      const currentUser = CookieService.getCookie("user");

      const appointmentSnapshot = await getDocs(
        collection(db, "doctors", currentUser.email, "appointments")
      );

      const appointments = appointmentSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return { status: true, data: appointments };
    } catch (e) {
      return { status: false };
    }
  }

  static async logout() {
    try {
      await signOut(auth);

      CookieService.deleteCookie("user");

      return { status: true };
    } catch (e) {
      alert(ERROR_MSG);
      return { status: false };
    }
  }
}
