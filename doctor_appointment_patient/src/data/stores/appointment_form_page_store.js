import dayjs from "dayjs";
import { create } from "zustand";
import { HOME_PAGE_ROUTE } from "../../config/routes";
import AppointmentFormPageController from "../controllers/appointment_form_page_controller";

const useAppointmentFormPageStore = create((set, get) => ({
  date: dayjs(new Date()),
  fullName: "",
  age: "",
  number: "",
  doctor: "",
  fee: "",
  doctors: [],
  init: () => {
    get().fetchDoctors();
  },
  updateState: ({ state, value }) => {
    set({ [state]: value });
  },
  fetchDoctors: async () => {
    const res = await AppointmentFormPageController.fetchDoctors();

    if (!res.status) {
      return;
    }

    set({ doctors: res.data });
  },
  handleAppointmentSubmit: async (e) => {
    e.preventDefault();

    const res = await AppointmentFormPageController.handleAppointmentSubmit({
      date: get().date,
      fullName: get().fullName,
      age: get().age,
      number: get().number,
      doctor: get().doctor,
      fee: get().fee,
    });

    if (!res.status) {
      return;
    }

    window.location = HOME_PAGE_ROUTE;
  },
}));

export default useAppointmentFormPageStore;
