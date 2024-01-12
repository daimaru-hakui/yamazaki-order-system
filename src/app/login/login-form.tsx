import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signOut } from "next-auth/react";
import {Button} from "@/components/ui/button"

type Inputs = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signInHandler(data);
  };
  const signInHandler = async (data: Inputs) => {
    const { email, password } = data;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='text-center'>Login</div>
        <div className="mt-6 w-full">
            <Button>Click me</Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
