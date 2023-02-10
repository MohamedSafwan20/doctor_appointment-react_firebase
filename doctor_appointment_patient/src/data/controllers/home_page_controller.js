import { signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { ERROR_MSG } from "../../config/constants";
import { auth, db } from "../../config/firebase";
import CookieService from "../services/cookie_service";
export default class HomePageController {
  static async fetchAppointments() {
    try {
      const currentUser = CookieService.getCookie("user");

      const appointmentSnapshot = await getDocs(
        query(
          collection(db, "patients", currentUser.email, "appointments"),
          orderBy("appointmentDate")
        )
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
      toast.error(ERROR_MSG);
      return { status: false };
    }
  }
}
