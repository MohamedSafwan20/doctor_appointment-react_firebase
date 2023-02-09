import { create } from "zustand";
import { LOGIN_PAGE_ROUTE } from "../../config/routes";
import HomePageController from "../controllers/home_page_controller";

const useHomePageStore = create((set, get) => ({
  appointments: [],
  init: () => {
    get().fetchAppointments();
  },
  fetchAppointments: async () => {
    const res = await HomePageController.fetchAppointments();

    if (res.status) {
      set({ appointments: res.data });
    }
  },
  logout: async () => {
    const res = await HomePageController.logout();

    if (!res.status) {
      return;
    }

    window.location = LOGIN_PAGE_ROUTE;
  },
}));

export default useHomePageStore;
