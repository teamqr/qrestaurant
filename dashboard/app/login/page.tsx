import LoginForm from "@/components/auth/LoginForm";
import React from "react";

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const LoginPage = (props: Props) => {
  return (
    <div>
      <LoginForm
        callBackUrl={"/dashboard"}
        error={props.searchParams?.error}
      />
    </div>
  );
};

export default LoginPage;
