import { Button } from "@mui/material";
import dayjs from "dayjs";
import { IoIosDoneAll } from "react-icons/io";
import { Link } from "react-router-dom";
import { create } from "zustand";
import { LOGIN_PAGE_ROUTE, PRESCRIPTION_PAGE_ROUTE } from "../../config/routes";
import HomePageController from "../controllers/home_page_controller";

const useHomePageStore = create((set, get) => ({
  appointments: [],
  cpyAppointments: [],
  date: dayjs(new Date()),
  doctor: {},
  columns: [
    { field: "tokenNumber", headerName: "Token Number", width: 150 },
    {
      field: "appointmentDate",
      headerName: "Appointment Date",
      width: 150,
      renderCell: (params) => {
        const appointmentDate = dayjs(params.value).format("DD-MMM-YYYY");

        return <span>{appointmentDate}</span>;
      },
    },
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
          <>
            {params.row.completed ? (
              <Button
                variant="contained"
                size="small"
                color="success"
                disabled
                startIcon={<IoIosDoneAll />}
              >
                Uploaded
              </Button>
            ) : (
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
              </Link>
            )}
          </>
        );
      },
    },
  ],
  updateState: ({ state, value }) => {
    set({ [state]: value });

    if (state === "date") {
      get().filterAppointments({ date: new Date(value) });
    }
  },
  init: () => {
    get().fetchDoctor();
    get().fetchAppointments();
  },
  fetchAppointments: async () => {
    const res = await HomePageController.fetchAppointments();

    if (res.status) {
      set({ cpyAppointments: res.data });
      get().filterAppointments({ date: get().date });
    }
  },
  logout: async () => {
    const res = await HomePageController.logout();

    if (!res.status) {
      return;
    }

    window.location = LOGIN_PAGE_ROUTE;
  },
  filterAppointments: ({ date }) => {
    const res = HomePageController.filterAppointments({
      date,
      appointments: get().cpyAppointments,
    });

    if (!res.status) {
      return;
    }

    set({ appointments: res.data });
  },
  fetchDoctor: async () => {
    const res = await HomePageController.fetchDoctor();

    if (!res.status) {
      return;
    }

    set({ doctor: res.data });
  },
}));

export default useHomePageStore;
