import { NextPage } from "next";
import React from "react";
import LoginForm from "./login-form";

const LoginPage: NextPage = () => {
  return (
    <div className="w-full max-w-[calc(400px)]">
      <div className="text-center mt-6 text-2xl">Login</div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
