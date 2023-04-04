import { create } from "zustand";
import ProfilePageController from "../controllers/profile_page_controller";

const useProfilePageStore = create((set, get) => ({
  name: "",
  hospitalName: "",
  department: "",
  fees: "",
  qualifications: "",
  isLoading: false,
  init: () => {
    get().fetchDoctor();
  },
  updateState: ({ state, value }) => {
    set({ [state]: value });
  },
  updateProfile: async (e) => {
    e.preventDefault();

    set({ isLoading: true });

    const res = await ProfilePageController.updateProfile({
      name: get().name,
      hospitalName: get().hospitalName,
      department: get().department,
      fees: get().fees,
      qualifications: get().qualifications,
    });

    set({ isLoading: false });

    if (!res.status) {
      return;
    }
  },
  fetchDoctor: async () => {
    const res = await ProfilePageController.fetchDoctor();

    if (!res.status) {
      return;
    }

    set({
      name: res.data.name,
      hospitalName: res.data.hospitalName,
      department: res.data.department,
      fees: res.data.fees,
      qualifications: res.data.qualifications,
    });
  },
}));

export default useProfilePageStore;
