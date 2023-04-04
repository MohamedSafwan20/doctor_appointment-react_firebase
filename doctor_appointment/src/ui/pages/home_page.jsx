import { IconButton, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect } from "react";
import { IoMdLogOut } from "react-icons/io";
import CookieService from "../../data/services/cookie_service";
import useHomePageStore from "../../data/stores/home_page_store";

function HomePage() {
  const { appointments, columns, logout, init, updateState, date, doctor } =
    useHomePageStore();

  const currentUser = CookieService.getCookie("user");

  useEffect(() => {
    init();
  }, [init]);

  return (
    <main className="bg-disabled min-h-screen flex justify-center py-12">
      <div className="rounded-xl bg-white w-[90%] max-w-7xl flex flex-col lg:p-16 px-6 py-8 min-h-[50vh] space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div>
              <h4 className="font-semibold">Dr. {currentUser?.displayName}</h4>
              <p className="font-semibold text-xs text-secondary">
                {doctor.hospitalName}
              </p>
              <p className="font-semibold text-xs text-secondary">
                {doctor.department}
              </p>
              <p className="font-semibold text-xs text-secondary">
                {doctor.qualifications}
              </p>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                shouldDisableDate={(value) => {
                  const date = new Date(value);
                  return date.getDay() === 0 || date.getDay() === 6;
                }}
                required
                disablePast
                inputFormat="DD-MM-YYYY"
                value={date}
                onChange={(value) => {
                  updateState({ state: "date", value });
                }}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </LocalizationProvider>
          </div>
          <IconButton color="primary" component="label" onClick={logout}>
            <IoMdLogOut />
          </IconButton>
        </div>
        <DataGrid
          rows={appointments}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      </div>
    </main>
  );
}

export default HomePage;
