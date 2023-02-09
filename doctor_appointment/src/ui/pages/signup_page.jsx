import { Button, TextField } from "@mui/material";
import React from "react";
import { LOGIN_PAGE_ROUTE } from "../../config/routes";
import useSignupPageStore from "../../data/stores/signup_page_store";

function SignupPage() {
  const { register, updateState, isLoading } = useSignupPageStore();

  return (
    <main className="bg-disabled min-h-screen flex justify-center items-center">
      <div className="rounded-xl bg-white w-[40%] flex justify-center items-center flex-col space-y-4 p-16">
        <form className="w-[100%] space-y-4" onSubmit={register}>
          <h1 className="font-[500] text-primary text-3xl">Create Account</h1>
          <h1 className="text-secondary mt-2">Sign up for new account</h1>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="fullName" className="text-sm font-semibold">
              Full Name
            </label>
            <TextField
              required
              id="fullName"
              variant="outlined"
              size="small"
              onChange={(e) => {
                updateState({ state: "name", value: e.target.value });
              }}
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <TextField
              required
              id="email"
              variant="outlined"
              type="email"
              size="small"
              onChange={(e) => {
                updateState({ state: "email", value: e.target.value });
              }}
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="department" className="text-sm font-semibold">
              Department
            </label>
            <TextField
              required
              id="department"
              variant="outlined"
              size="small"
              onChange={(e) => {
                updateState({ state: "department", value: e.target.value });
              }}
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="fees" className="text-sm font-semibold">
              Fees
            </label>
            <TextField
              required
              type="number"
              id="fees"
              variant="outlined"
              size="small"
              onChange={(e) => {
                updateState({ state: "fees", value: e.target.value });
              }}
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <TextField
              required
              id="password"
              variant="outlined"
              type="password"
              size="small"
              onChange={(e) => {
                updateState({ state: "password", value: e.target.value });
              }}
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="confirmPassword" className="text-sm font-semibold">
              Confirm Password
            </label>
            <TextField
              required
              id="confirmPassword"
              variant="outlined"
              type="password"
              size="small"
              onChange={(e) => {
                updateState({
                  state: "confirmPassword",
                  value: e.target.value,
                });
              }}
            />
          </div>
          <Button
            variant="contained"
            className="w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading.." : "Sign up"}
          </Button>
          <div className="text-center">
            <p className="text-secondary text-[0.86em]">
              Already have an account?{" "}
              <Button href={LOGIN_PAGE_ROUTE}>
                <label className="font-[600] text-[0.88em]">Sign in</label>
              </Button>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignupPage;
