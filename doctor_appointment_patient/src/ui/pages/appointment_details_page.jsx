import { Button } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

function AppointmentDetailsPage() {
  const location = useLocation();

  return (
    <main className="bg-disabled min-h-screen flex justify-center items-center p-16">
      <div className="rounded-xl bg-white w-[60%] flex justify-center items-center flex-col space-y-4 p-16">
        <div className="w-[100%] space-y-6">
          <h1 className="font-[500] text-primary text-3xl text-center mb-10">
            Appointment Details
          </h1>
          <div className="text-center">
            <p className="text-secondary">Your Token</p>
            <h3 className="text-[4em] font-semibold text-gray-500 leading-[60px]">
              {location.state?.appointment.tokenNumber ?? 0}
            </h3>
          </div>
          <div className="text-center">
            <p className="text-secondary">Current Token</p>
            <h3 className="text-[4em] font-semibold text-success leading-[60px]">
              48
            </h3>
          </div>
          <div className="w-[280px] mx-auto text-center space-y-2">
            <Button variant="outlined" color="error">
              Cancel
            </Button>
            <Button variant="outlined" color="success">
              Download Prescription
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AppointmentDetailsPage;
