"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../form/CustomButton";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string[]>([]);

  const submitLogin = async () => {
    const formData = {
      email: email,
      password: password,
    };

    const response = await apiService.post("/api/auth/login/", formData);

    if (response.access) {
      // ログイン処理
      handleLogin(response.user.pk, response.access, response.refresh);

      loginModal.close();
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
      <form className="space-y-4" action={submitLogin}>
        <input
          placeholder="Your e-mail address"
          type="email"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          placeholder="Your password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        {error.map((err, index) => (
          <div
            className="p-5 bg-airbnb text-white rounded-xl opacity-80"
            key={index}
          >
            {err}
          </div>
        ))}

        <CustomButton label="Log in" onClick={submitLogin} />
      </form>
    </>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label="Log in"
      content={content}
    />
  );
};

export default LoginModal;
