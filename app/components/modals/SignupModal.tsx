"use client";

import Modal from "./Modal";

import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../form/CustomButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const SignupModal = () => {
  //variables

  const router = useRouter();
  const signupModal = useSignupModal();
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [error, setError] = useState<string[]>([]);

  //functions

  const submitSignup = async () => {
    const formData = {
      email: email,
      password1: password1,
      password2: password2,
    };

    const response = await apiService.post("/api/auth/register/", formData);

    if (response.access) {
      // ログイン処理
      handleLogin(response.user.pk, response.access, response.refresh);

      signupModal.close();
      router.push("/");
    } else {
      const tmpErrors: string[] = Object.values(response).flatMap(
        (error: unknown): string[] => {
          return Array.isArray(error) ? error : [error as string];
        }
      );

      setError(tmpErrors);
    }
  };

  const content = (
    <>
      <form className="space-y-4" action={submitSignup}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your e-mail address"
          type="email"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <input
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          placeholder="Your password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <input
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Repeat password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        {error.map((err, index) => (
          <div
            className="p-5 bg-airbnb text-white rounded-xl opacity-80"
            key={index}
          >
            {err}
          </div>
        ))}

        <CustomButton label="Sign up" onClick={submitSignup} />
      </form>
    </>
  );

  return (
    <Modal
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="Sign up"
      content={content}
    />
  );
};

export default SignupModal;
