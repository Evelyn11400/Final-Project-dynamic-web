import { useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "../../components/loginForm";
export default function Login({ isLoggedIn, loginUserFunction }) {
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) router.push("/diary");
  }, [isLoggedIn]);
  console.log(isLoggedIn);
  return (
    <div>
      <LoginForm loginUserFunction={loginUserFunction} />
    </div>
  );
}
