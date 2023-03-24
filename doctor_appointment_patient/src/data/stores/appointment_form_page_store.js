import dayjs from "dayjs";
import toast from "react-hot-toast";
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
  isModalOpen: false,
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

    if (get().fullName.length < 3) {
      toast.error("Invalid Name");
      return;
    }

    if (get().age.includes("-")) {
      toast.error("Invalid Age");
      return;
    }

    if (get().number.length > 0 && get().number.length !== 10) {
      toast.error("Invalid Number");
      return;
    }

    get().openModal();
  },
  openModal: () => {
    set({ isModalOpen: true });
  },
  closeModal: () => {
    set({ isModalOpen: false });
  },
  submitAppointment: async (e) => {
    e.preventDefault();

    const res = await AppointmentFormPageController.submitAppointment({
      date: get().date,
      fullName: get().fullName,
      age: get().age,
      number: get().number,
      doctor: get().doctor,
      fee: get().fee,
    });

    get().closeModal();

    if (!res.status) {
      return;
    }

    window.location = HOME_PAGE_ROUTE;
  },
}));

export default useAppointmentFormPageStore;
