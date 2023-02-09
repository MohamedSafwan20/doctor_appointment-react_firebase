import { create } from "zustand";
import { HOME_PAGE_ROUTE } from "../../config/routes";
import AppointmentDetailsPageController from "../controllers/appointment_details_page_controller";

const useAppointmentDetailsPageStore = create((set, get) => ({
  appointment: {},
  completedAppointments: 0,
  isLoading: false,
  init: () => {
    get().listenAppointments();
  },
  listenAppointments: async () => {
    AppointmentDetailsPageController.listenAppointments({
      appointment: get().appointment,
    });
  },
  cancelAppointment: async () => {
    set({ isLoading: true });

    const res = await AppointmentDetailsPageController.cancelAppointment({
      appointment: get().appointment,
    });

    set({ isLoading: false });

    if (!res.status) {
      return;
    }

    window.location.replace(HOME_PAGE_ROUTE);
  },
}));

export default useAppointmentDetailsPageStore;
