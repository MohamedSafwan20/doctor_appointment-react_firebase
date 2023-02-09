import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HOME_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  PRESCRIPTION_PAGE_ROUTE,
  SIGNUP_PAGE_ROUTE,
} from "./config/routes";
import HomePage from "./ui/pages/home_page";
import LoginPage from "./ui/pages/login_page";
import PrescriptionPage from "./ui/pages/prescription_page";
import SignupPage from "./ui/pages/signup_page";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path={HOME_PAGE_ROUTE} element={<HomePage />} />
          <Route path={LOGIN_PAGE_ROUTE} element={<LoginPage />} />
          <Route path={SIGNUP_PAGE_ROUTE} element={<SignupPage />} />
          <Route
            path={PRESCRIPTION_PAGE_ROUTE}
            element={<PrescriptionPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
