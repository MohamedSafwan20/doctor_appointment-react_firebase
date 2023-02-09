import { create } from "zustand";
import { HOME_PAGE_ROUTE } from "../../config/routes";
import LoginPageController from "../controllers/login_page_controller";

const useLoginPageStore = create((set, get) => ({
  email: "",
  password: "",
  isLoading: false,
  updateState: ({ state, value }) => {
    set({ [state]: value });
  },
  login: async (e) => {
    e.preventDefault();

    set({ isLoading: true });

    const res = await LoginPageController.login({
      email: get().email,
      password: get().password,
    });

    set({ isLoading: false });

    if (res.status) {
      window.location = HOME_PAGE_ROUTE;
    }
  },
}));

export default useLoginPageStore;
