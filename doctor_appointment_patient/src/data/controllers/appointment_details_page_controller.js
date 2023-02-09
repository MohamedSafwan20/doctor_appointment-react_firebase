import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { ERROR_MSG, SUCCESS_MSG } from "../../config/constants";
import { db } from "../../config/firebase";
import CookieService from "../services/cookie_service";
import useAppointmentDetailsPageStore from "../stores/appointment_details_page_store";
export default class AppointmentDetailsPageController {
  static async listenAppointments({ appointment }) {
    try {
      const appointmentsRef = collection(
        db,
        "doctors",
        appointment.id,
        "appointments"
      );

      onSnapshot(appointmentsRef, (item) => {
        let completedAppointments = 0;
        for (const appointment of item.docs) {
          if (appointment.get("completed")) {
            completedAppointments++;
          }
        }

        useAppointmentDetailsPageStore.setState({ completedAppointments });
      });
    } catch (e) {
      return { status: false };
    }
  }

  static async cancelAppointment({ appointment }) {
    try {
      const currentUser = CookieService.getCookie("user");

      const appointmentDoctorRef = doc(
        db,
        "doctors",
        appointment.id,
        "appointments",
        currentUser.email
      );
      const appointmentPatientRef = doc(
        db,
        "patients",
        currentUser.email,
        "appointments",
        appointment.id
      );

      await deleteDoc(appointmentDoctorRef);
      await deleteDoc(appointmentPatientRef);

      alert(SUCCESS_MSG);

      return { status: true };
    } catch (e) {
      alert(ERROR_MSG);
      return { status: false };
    }
  }
}
