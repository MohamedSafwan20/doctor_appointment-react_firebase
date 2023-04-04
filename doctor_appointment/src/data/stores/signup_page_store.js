import { create } from "zustand";
import { HOME_PAGE_ROUTE } from "../../config/routes";
import SignupPageController from "../controllers/signup_page_controller";

const useSignupPageStore = create((set, get) => ({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  hospitalName: "",
  department: "",
  fees: "",
  qualifications: "",
  isLoading: false,
  updateState: ({ state, value }) => {
    set({ [state]: value });
  },
  register: async (e) => {
    e.preventDefault();

    set({ isLoading: true });

    const res = await SignupPageController.signup({
      email: get().email,
      password: get().password,
      name: get().name,
      department: get().department,
      fees: get().fees,
      hospitalName: get().hospitalName,
      qualifications: get().qualifications,
      confirmPassword: get().confirmPassword,
    });

    set({ isLoading: false });

    if (!res.status) {
      return;
    }

    window.location = HOME_PAGE_ROUTE;
  },
}));

export default useSignupPageStore;
