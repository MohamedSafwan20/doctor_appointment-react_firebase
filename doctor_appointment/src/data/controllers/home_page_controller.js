import { signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
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

      const appointments = appointmentSnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          appointmentDate: doc.get("appointmentDate").toDate(),
          id: doc.id,
        };
      });

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
      toast.error(ERROR_MSG);
      return { status: false };
    }
  }

  static filterAppointments({ date, appointments }) {
    try {
      const data = appointments.filter((item) => {
        return item.appointmentDate.toDateString() === date.toDateString();
      });

      return { status: true, data };
    } catch (e) {
      return { status: false };
    }
  }

  static async fetchDoctor() {
    try {
      const currentUser = CookieService.getCookie("user");

      const doctorDoc = await getDoc(doc(db, "doctors", currentUser.email));

      return { status: true, data: doctorDoc.data() };
    } catch (e) {
      return { status: false };
    }
  }
}
