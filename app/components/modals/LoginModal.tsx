"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../form/CustomButton";
import Modal from "./Modal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const content = (
    <>
      <form className="space-y-4">
        <input
          placeholder="Your e-mail address"
          type="email"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <input
          placeholder="Your password"
          type="password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
          error test
        </div>

        <CustomButton
          label="Submit"
          onClick={() => {
            console.log("test");
          }}
        />
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
