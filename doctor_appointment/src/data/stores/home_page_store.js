import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { create } from "zustand";
import { LOGIN_PAGE_ROUTE, PRESCRIPTION_PAGE_ROUTE } from "../../config/routes";
import HomePageController from "../controllers/home_page_controller";

const useHomePageStore = create((set, get) => ({
  appointments: [],
  columns: [
    { field: "tokenNumber", headerName: "Token Number", width: 150 },
    {
      field: "fullName",
      headerName: "Name",
      width: 250,
    },
    {
      field: "age",
      headerName: "Age",
      width: 110,
    },
    {
      field: "number",
      headerName: "Phone Number",
      width: 250,
    },
    {
      field: "id",
      headerName: "Email",
      width: 250,
    },
    {
      field: "prescription",
      headerName: "Prescription",
      width: 250,
      renderCell: (params) => {
        return (
          <Link
            to={PRESCRIPTION_PAGE_ROUTE}
            state={{
              appointment: get().appointments.filter(
                (item) => item.id === params.id
              ),
            }}
          >
            <Button variant="contained" size="small">
              Enter Prescription
            </Button>
            {/* <Button variant="contained" size="small" color="success" disabled startIcon={ <IoIosDoneAll />}>
            Uploaded
          </Button> */}
          </Link>
        );
      },
    },
  ],
  init: () => {
    get().fetchAppointments();
  },
  fetchAppointments: async () => {
    const res = await HomePageController.fetchAppointments();

    console.log({ res });

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
