import { Button, MenuItem, Select, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect } from "react";
import useAppointmentFormPageStore from "../../data/stores/appointment_form_page_store";

function AppointmentFormPage() {
  const {
    date,
    fullName,
    number,
    doctor,
    fee,
    doctors,
    init,
    handleAppointmentSubmit,
    updateState,
  } = useAppointmentFormPageStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <main className="bg-disabled min-h-screen flex justify-center items-center lg:p-16 px-2 py-8">
      <div className="rounded-xl bg-white md:w-[60%] w-[90%] max-w-7xl flex justify-center items-center flex-col space-y-4 lg:p-16 px-6 py-8">
        <form className="w-[100%] space-y-4" onSubmit={handleAppointmentSubmit}>
          <h1 className="font-[500] text-primary lg:text-3xl text-xl text-center mb-5">
            Appointment Form
          </h1>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="fullName" className="text-sm font-semibold">
              Full Name
            </label>
            <TextField
              required
              id="fullName"
              variant="outlined"
              size="small"
              value={fullName}
              onChange={(e) =>
                updateState({ state: "fullName", value: e.target.value })
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="age" className="text-sm font-semibold">
              Age
            </label>
            <TextField
              required
              id="age"
              variant="outlined"
              size="small"
              type="number"
              onChange={(e) =>
                updateState({ state: "age", value: e.target.value })
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="phoneNumber" className="text-sm font-semibold">
              Phone Number
            </label>
            <TextField
              id="phoneNumber"
              variant="outlined"
              size="small"
              type="number"
              value={number}
              onChange={(e) =>
                updateState({ state: "number", value: e.target.value })
              }
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label
              htmlFor="department-select-label"
              className="text-sm font-semibold"
            >
              Doctor
            </label>
            <Select
              required
              labelId="department-select-label"
              id="department-select"
              size="small"
              value={doctor}
              onChange={(e) => {
                updateState({ state: "doctor", value: e.target.value });
                const doctor = doctors.filter(
                  (item) => item.id === e.target.value
                );
                updateState({ state: "fee", value: doctor[0].fees });
              }}
            >
              {doctors.map((doctor) => {
                return (
                  <MenuItem value={doctor.id} key={doctor.id}>
                    {doctor.name + ", " + doctor.department}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="appointmentDate" className="text-sm font-semibold">
              Appointment Date
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                required
                disablePast
                inputFormat="DD-MM-YYYY"
                value={date}
                onChange={(value) => {
                  updateState({ state: "date", value });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div className="space-y-1 flex flex-col">
            <label htmlFor="doctorfee" className="text-sm font-semibold">
              Doctor Fee
            </label>
            <TextField
              required
              disabled
              id="doctorfee"
              variant="outlined"
              size="small"
              value={fee}
              onChange={(e) =>
                updateState({ state: "fee", value: e.target.value })
              }
            />
          </div>
          <Button variant="contained" className="w-full" type="submit">
            Pay
          </Button>
        </form>
      </div>
    </main>
  );
}

export default AppointmentFormPage;
