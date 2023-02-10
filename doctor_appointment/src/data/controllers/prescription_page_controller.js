import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import { ERROR_MSG, SUCCESS_MSG } from "../../config/constants";
import { db, storage } from "../../config/firebase";
import CookieService from "../services/cookie_service";

export default class PrescriptionPageController {
  static async convertPrescriptionToPng({ prescription, getPng }) {
    try {
      if (prescription === "") {
        toast.error("Invalid Prescription");
        return { status: false };
      }

      getPng();

      return { status: true };
    } catch (e) {
      toast.error(ERROR_MSG);

      return { status: false };
    }
  }

  static async convertToPdf({ dataURL, appointment }) {
    try {
      if (dataURL === null) {
        return { status: false };
      }

      const currentUser = CookieService.getCookie("user");

      const doc = new jsPDF();
      doc.addImage(dataURL, "PNG", 15, 40, 180, 180);

      const res = await this._uploadToStorage({
        file: doc.output("dataurl"),
        filename: `Dr. ${currentUser.displayName}'s Prescription - ${appointment.appointmentDate}`,
        appointment,
      });

      if (!res.status) {
        throw new Error();
      }

      toast.success(SUCCESS_MSG);

      return { status: true };
    } catch (e) {
      toast.error(ERROR_MSG);

      return { status: false };
    }
  }

  static async _uploadToStorage({ file, filename, appointment }) {
    try {
      const currentUser = CookieService.getCookie("user");

      const prescriptionsRef = ref(storage, `prescriptions/${filename}.pdf`);

      const res = await uploadString(prescriptionsRef, file, "data_url");
      const prescriptionUrl = await getDownloadURL(res.ref);

      const doctorAppointmentDocRef = doc(
        db,
        "doctors",
        currentUser.email,
        "appointments",
        appointment.id
      );
      const patientAppointmentDocRef = doc(
        db,
        "patients",
        appointment.id,
        "appointments",
        currentUser.email
      );

      await updateDoc(doctorAppointmentDocRef, {
        completed: true,
      });
      await updateDoc(patientAppointmentDocRef, {
        prescriptionUrl,
        completed: true,
      });

      return { status: true };
    } catch (e) {
      toast.error(ERROR_MSG);
      return { status: false };
    }
  }
}
