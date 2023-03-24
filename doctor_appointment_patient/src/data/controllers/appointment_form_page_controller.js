import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { ERROR_MSG, SUCCESS_MSG } from "../../config/constants";
import { db } from "../../config/firebase";
import CookieService from "../services/cookie_service";
export default class AppointmentFormPageController {
  static async fetchDoctors() {
    try {
      const doctorsSnapshot = await getDocs(collection(db, "doctors"));

      const doctors = doctorsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return { status: true, data: doctors };
    } catch (e) {
      toast.error(ERROR_MSG);
      return { status: false };
    }
  }

  static async submitAppointment({ date, fullName, age, number, doctor, fee }) {
    try {
      const appointmentSnapshot = await getDocs(
        collection(db, "doctors", doctor, "appointments")
      );

      const currentUser = CookieService.getCookie("user");

      const payload = {
        fullName: fullName,
        age: age,
        number: number,
        doctor: doctor,
        appointmentDate: date.toDate(),
        doctorFee: fee,
        tokenNumber: appointmentSnapshot.docs.length + 1,
      };

      await setDoc(
        doc(db, "doctors", doctor, "appointments", currentUser.email),
        payload
      );
      await setDoc(
        doc(db, "patients", currentUser.email, "appointments", doctor),
        payload
      );

      toast.success(SUCCESS_MSG);

      return { status: true };
    } catch (e) {
      toast.error(ERROR_MSG);
      return { status: false };
    }
  }
}
