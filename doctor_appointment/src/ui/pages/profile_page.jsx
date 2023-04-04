import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import useProfilePageStore from "../../data/stores/profile_page_store";

function ProfilePage() {
  const {
    updateProfile,
    updateState,
    isLoading,
    init,
    name,
    hospitalName,
    department,
    qualifications,
    fees,
  } = useProfilePageStore();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <main className="bg-disabled min-h-screen flex justify-center items-center py-10">
      <div className="rounded-xl bg-white md:w-[40%] w-[90%] max-w-2xl flex justify-center items-center flex-col space-y-4 lg:p-16 px-6 py-8">
        <form className="w-[100%] space-y-4" onSubmit={updateProfile}>
          <h1 className="font-[500] text-primary lg:text-3xl text-xl">
            Update Profile
          </h1>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="fullName" className="text-sm font-semibold">
              Full Name
            </label>
            <TextField
              required
              value={name}
              id="fullName"
              variant="outlined"
              size="small"
              onChange={(e) => {
                updateState({ state: "name", value: e.target.value });
              }}
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="hospitalName" className="text-sm font-semibold">
              Hospital Name
            </label>
            <TextField
              required
              value={hospitalName}
              id="hospitalName"
              variant="outlined"
              size="small"
              onChange={(e) => {
                updateState({ state: "hospitalName", value: e.target.value });
              }}
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="department" className="text-sm font-semibold">
              Department
            </label>
            <TextField
              required
              value={department}
              id="department"
              variant="outlined"
              size="small"
              onChange={(e) => {
                updateState({ state: "department", value: e.target.value });
              }}
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="qualifications" className="text-sm font-semibold">
              Qualifications
            </label>
            <TextField
              required
              value={qualifications}
              id="qualifications"
              variant="outlined"
              size="small"
              onChange={(e) => {
                updateState({ state: "qualifications", value: e.target.value });
              }}
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="fees" className="text-sm font-semibold">
              Fees
            </label>
            <TextField
              required
              value={fees}
              type="number"
              id="fees"
              variant="outlined"
              size="small"
              onChange={(e) => {
                updateState({ state: "fees", value: e.target.value });
              }}
            />
          </div>
          <Button
            variant="contained"
            className="w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading.." : "Update"}
          </Button>
        </form>
      </div>
    </main>
  );
}

export default ProfilePage;
