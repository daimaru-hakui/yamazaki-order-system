"use client";
import React, { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { User, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { Button, Input } from "@nextui-org/react";

type Inputs = {
  email: string;
  password: string;
  key: string;
};

const SignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.key === process.env.NEXT_PUBLIC_SIGNUP_KEY) {
      await signInHandler(data);
    }
  };
  const signInHandler = async (data: Inputs) => {
    const { email, password, key } = data;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await fetchUserPost(user);
    } catch (error) {
      console.error(error);
      alert("サインアップに失敗しました");
    }
  };

  const fetchUserPost = async (user: User) => {
    const url = "/api/signup";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
    });
    return await res.json();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="text-center mt-2 text-2xl">SignUp</div>
        <div className="flex flex-col gap-6 mt-6">
          <Input
            type="email"
            labelPlacement="outside"
            label="email"
            placeholder="emailを入力してください"
            errorMessage={errors.email && "emailを入力してください"}
            {...register("email", { required: true })}
          />
          <Input
            type="password"
            labelPlacement="outside"
            label="password"
            placeholder="パスワードを入力してください"
            errorMessage={errors.password && "passwordを入力してください"}
            {...register("password", { required: true })}
          />
          <Input
            type="password"
            labelPlacement="outside"
            label="key"
            placeholder="key"
            errorMessage={errors.key && "keyを入力してください"}
            {...register("key", { required: true })}
          />
          <div className="flex items-center justify-between">
            <Button type="submit" color="primary" className="w-full">
              Sign In
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
