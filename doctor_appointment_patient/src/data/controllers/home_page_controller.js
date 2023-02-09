import { signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ERROR_MSG } from "../../config/constants";
import { auth, db } from "../../config/firebase";
import CookieService from "../services/cookie_service";
export default class HomePageController {
  static async fetchAppointments() {
    try {
      const currentUser = CookieService.getCookie("user");

      const appointmentSnapshot = await getDocs(
        collection(db, "patients", currentUser.email, "appointments")
      );

      const appointments = await Promise.all(
        appointmentSnapshot.docs.map(async (item) => {
          const doctorSnapshot = await getDoc(doc(db, "doctors", item.id));

          return {
            ...item.data(),
            id: item.id,
            doctor: doctorSnapshot.data(),
          };
        })
      );

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
