import { Button, TextField } from "@mui/material";
import React from "react";
import { SIGNUP_PAGE_ROUTE } from "../../config/routes";
import useLoginPageStore from "../../data/stores/login_page_store";

function LoginPage() {
  const { login, updateState, isLoading } = useLoginPageStore();

  return (
    <main className="bg-disabled min-h-screen flex justify-center items-center py-10">
      <div className="rounded-xl bg-white md:w-[40%] w-[90%] max-w-2xl flex justify-center items-center flex-col space-y-4 lg:p-16 px-6 py-8">
        <form className="w-[100%] space-y-4" onSubmit={login}>
          <h1 className="font-[500] text-primary lg:text-3xl text-xl">
            Welcome Back
          </h1>
          <h1 className="text-secondary mt-2 text-xs md:text-md">
            Welcome back! Please enter your details to continue
          </h1>
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
          <Button
            variant="contained"
            className="w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading.." : "Sign in"}
          </Button>
          <div className="text-center">
            <p className="text-secondary text-xs md:text-[0.86em]">
              Don't have an account?{" "}
              <Button href={SIGNUP_PAGE_ROUTE}>
                <label className="font-[600] text-xs md:text-[0.86em]">
                  Sign up
                </label>
              </Button>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
