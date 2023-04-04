import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { ERROR_MSG, SUCCESS_MSG } from "../../config/constants";
import { auth, db } from "../../config/firebase";
import CookieService from "../services/cookie_service";

export default class ProfilePageController {
  static async updateProfile({
    name,
    hospitalName,
    department,
    fees,
    qualifications,
  }) {
    try {
      if (name.length < 3) {
        toast.error("Invalid Name");
        return { status: false };
      }

      if (department.length < 3) {
        toast.error("Invalid Department");
        return { status: false };
      }

      if (hospitalName.length < 3) {
        toast.error("Invalid Hospital Name");
        return { status: false };
      }

      if (qualifications === "") {
        toast.error("Invalid Qualifications");
        return { status: false };
      }

      if (fees.includes("-")) {
        toast.error("Invalid Fees");
        return { status: false };
      }

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      const doctorsRef = doc(db, "doctors", auth.currentUser.email);
      await updateDoc(doctorsRef, {
        department,
        fees,
        hospitalName,
        qualifications,
        name,
      });

      CookieService.setCookie({ name: "user", value: auth.currentUser });

      toast.success(SUCCESS_MSG);

      return { status: true };
    } catch (e) {
      toast.error(ERROR_MSG);
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
