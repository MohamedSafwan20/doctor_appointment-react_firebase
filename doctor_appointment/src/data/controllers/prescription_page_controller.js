import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { ERROR_MSG, SUCCESS_MSG } from "../../config/constants";

export default class PrescriptionPageController {
  static async uploadPrescription({ appointmentId, prescription }) {
    try {
      const payload = {
        prescription,
      };

      await updateDoc(
        doc(db, "patients", appointmentId, "appointments", appointmentId),
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
