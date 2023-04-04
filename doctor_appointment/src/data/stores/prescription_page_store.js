import { create } from "zustand";
import PrescriptionPageController from "../controllers/prescription_page_controller";

const usePrescriptionPageStore = create((set, get) => ({
  prescription: "",
  isLoading: false,
  appointment: {},
  doctor: {},
  init: () => {
    get().fetchDoctor();
  },
  updateState: ({ state, value }) => {
    set({ [state]: value });
  },
  convertPrescriptionToPng: async ({ getPng }) => {
    PrescriptionPageController.convertPrescriptionToPng({
      prescription: get().prescription,
      getPng,
    });
  },
  convertToPdf: async ({ dataURL }) => {
    set({ isLoading: true });

    const res = await PrescriptionPageController.convertToPdf({
      dataURL,
      appointment: get().appointment,
    });

    set({ isLoading: false });

    if (!res.status) {
      return;
    }

    window.history.back();
  },
  fetchDoctor: async () => {
    const res = await PrescriptionPageController.fetchDoctor();

    if (!res.status) {
      return;
    }

    set({ doctor: res.data });
  },
}));

export default usePrescriptionPageStore;
