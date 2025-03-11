import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignInHeader } from "../components/sign-in-header";
import { axios } from "../configs/axios.config";
import { useAppAuth } from "../hooks/auth-hook";
import { AuthLayout } from "../layouts/auth-layout";
import { useAppLoading } from "../hooks/use-app-loading";

type Inputs = {
  userName: string;
  password: string;
};

function SignInPage() {
  const { user, token, login } = useAppAuth();
  const { startLoading, stopLoading } = useAppLoading();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      startLoading();
      const response = await axios.post("auth/sign-in", data);
      login(response.data?.data?.token, response.data?.data?.user);
      navigate("/");
      stopLoading();
    } catch (error) {
      stopLoading();
      console.error(error);
    }
  };

  if (token && user) {
    navigate("/");
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SignInHeader />
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 my-3 border border-gray-200 rounded-lg"
          {...register("userName", { required: true })}
        />
        {errors.userName && (
          <span className="text-red-500">Username is required</span>
        )}
        <input
          type="password"
          placeholder="password"
          className="w-full p-3 my-3 border border-gray-200 rounded-lg"
          {...register("password", { required: true })}
        />
        {errors.userName && (
          <span className="text-red-500">Password is required</span>
        )}
        <button className="w-full p-3 my-3 bg-blue-500 text-white rounded-lg active:bg-blue-700">
          Sign In
        </button>
      </form>
    </AuthLayout>
  );
}

export default SignInPage;
