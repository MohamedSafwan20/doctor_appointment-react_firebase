import { collection, doc, getDocs, setDoc } from "firebase/firestore";
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
      alert(ERROR_MSG);
      return { status: false };
    }
  }

  static async handleAppointmentSubmit({
    date,
    fullName,
    age,
    number,
    doctor,
    fee,
  }) {
    try {
      if (fullName.length < 3) {
        alert("Invalid Name");
        return;
      }

      if (age.includes("-")) {
        alert("Invalid Age");
        return;
      }

      if (number.length > 0 && number.length !== 10) {
        alert("Invalid Number");
        return;
      }

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

      alert(SUCCESS_MSG);

      return { status: true };
    } catch (e) {
      alert(ERROR_MSG);
      return { status: false };
    }
  }
}
