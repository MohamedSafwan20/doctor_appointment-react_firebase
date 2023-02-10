import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { IoMdLogOut } from "react-icons/io";
import CookieService from "../../data/services/cookie_service";
import useHomePageStore from "../../data/stores/home_page_store";

function HomePage() {
  const { appointments, columns, logout, init } = useHomePageStore();

  const currentUser = CookieService.getCookie("user");

  useEffect(() => {
    init();
  }, [init]);

  return (
    <main className="bg-disabled min-h-screen flex justify-center py-12">
      <div className="rounded-xl bg-white w-[90%] max-w-7xl flex flex-col lg:p-16 px-6 py-8 min-h-[50vh] space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold">Dr. {currentUser?.displayName}</h4>
            <p className="text-secondary text-sm"></p>
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
