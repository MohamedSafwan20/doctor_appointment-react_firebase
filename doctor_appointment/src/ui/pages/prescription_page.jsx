import { Button, Divider, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { PRIMARY_COLOR } from "../../config/colors";
import CookieService from "../../data/services/cookie_service";
import usePrescriptionPageStore from "../../data/stores/prescription_page_store";

function PrescriptionPage() {
  const location = useLocation();

  const currentUser = CookieService.getCookie("user");

  const { updateState, isLoading, upload } = usePrescriptionPageStore();

  useEffect(() => {
    usePrescriptionPageStore.setState({
      appointment: location.state?.appointment[0] ?? {},
    });
  }, [location.state?.appointment]);

  return (
    <main className="bg-disabled min-h-screen flex justify-center items-center">
      <div className="rounded-xl bg-white w-[65%] flex justify-center items-center flex-col space-y-4 p-10">
        <div className="w-[100%] space-y-4">
          <div className="flex justify-between">
            <img src={logo} alt="logo" className="w-[80px] h-[80px]" />
            <div>
              <h4 className="font-semibold">Dr. {currentUser?.displayName}</h4>
            </div>
          </div>
          <Divider color={PRIMARY_COLOR} />
          <p className="text-sm text-primary">
            Token No.{" "}
            <span className="font-semibold">
              {location.state?.appointment[0].tokenNumber ?? ""}
            </span>
          </p>
          <div>
            <div className="flex items-end space-x-2">
              <p className="text-sm text-primary">Name: </p>
              <div className="w-[55%] text-center">
                <p className="text-sm font-semibold">
                  {location.state?.appointment[0].fullName ?? ""}
                </p>
                <Divider color="black" />
              </div>
              <p className="text-sm text-primary">Age: </p>
              <div className="w-[15%] text-center">
                <p className="text-sm font-semibold">
                  {location.state?.appointment[0].age ?? ""}
                </p>
                <Divider color="black" />
              </div>
              <p className="text-sm text-primary">Date: </p>
              <div className="w-[15%] text-center">
                <p className="text-sm font-semibold">
                  {/* {location.state.appointment[0].appointmentDate
                    .toDate()
                    .toISOString()} */}
                  20-04-2022
                </p>
                <Divider color="black" />
              </div>
            </div>

            <form onSubmit={upload}>
              <div className="mt-3 min-h-[50vh]">
                <TextField
                  required
                  variant="outlined"
                  multiline
                  fullWidth
                  minRows={15}
                  onChange={(e) => {
                    updateState({
                      state: "prescription",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="mt-2 text-right">
                <Button
                  variant="contained"
                  size="small"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? "Loading.." : "Upload"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PrescriptionPage;
