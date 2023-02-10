import { Button, Card, CardContent, IconButton } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { IoMdLogOut } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  APPOINTMENT_DETAILS_PAGE_ROUTE,
  APPOINTMENT_FORM_PAGE_ROUTE,
} from "../../config/routes";
import useHomePageStore from "../../data/stores/home_page_store";

function HomePage() {
  const { appointments, init, logout } = useHomePageStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <main className="bg-disabled min-h-screen flex justify-center p-16">
      <div className="rounded-xl bg-white w-[80%] flex items-center flex-col p-16 min-h-[50vh] relative">
        <div className="absolute right-5 top-2">
          <IconButton color="primary" component="label" onClick={logout}>
            <IoMdLogOut />
          </IconButton>
        </div>
        <div className="text-center">
          <p className="text-secondary text-[0.82em]">
            Press the below button to book an
            <br /> appointment with doctor
          </p>
          <Link to={APPOINTMENT_FORM_PAGE_ROUTE}>
            <IconButton color="primary">
              <IoAddCircleOutline size={35} />
            </IconButton>
          </Link>
        </div>
        <div className="mt-8 w-full flex flex-col space-y-3 items-center">
          {appointments.map((appointment) => {
            return (
              <Card
                style={{ width: "70%" }}
                variant="outlined"
                key={appointment.id}
              >
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-semibold text-center">
                    Dr. {appointment.doctor?.name}
                  </h3>
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="text-secondary text-sm">
                        Date:{" "}
                        {dayjs(appointment.appointmentDate.toDate()).format(
                          "DD-MMM-YYYY"
                        )}
                      </p>
                      <p className="text-secondary text-sm">
                        Token No: {appointment.tokenNumber}
                      </p>
                    </div>
                  </div>
                  <div className="text-center">
                    <Button variant="contained" size="small">
                      <Link
                        to={APPOINTMENT_DETAILS_PAGE_ROUTE}
                        state={{
                          appointment: appointment,
                        }}
                      >
                        {appointment.completed
                          ? "Completed"
                          : "View Appointment"}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default HomePage;
