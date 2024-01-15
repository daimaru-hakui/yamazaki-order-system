import { NextPage } from "next";
import React from "react";
import LoginForm from "./login-form";

const LoginPage: NextPage = () => {
  return (
    <div className="w-full max-w-[calc(400px)]">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
