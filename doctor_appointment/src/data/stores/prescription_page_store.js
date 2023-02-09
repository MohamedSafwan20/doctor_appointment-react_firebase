import { create } from "zustand";
import PrescriptionPageController from "../controllers/prescription_page_controller";

const usePrescriptionPageStore = create((set, get) => ({
  prescription: "",
  isLoading: false,
  appointment: {},
  updateState: ({ state, value }) => {
    set({ [state]: value });
  },
  upload: async (e) => {
    e.preventDefault();

    set({ isLoading: true });

    await PrescriptionPageController.uploadPrescription({
      appointmentId: get().appointment.id,
      prescription: get().prescription,
    });

    set({ isLoading: false });
  },
}));

export default usePrescriptionPageStore;
