import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setAuth } from "../redux/reducers";
import { IUser } from "../interfaces/user.interface";

export function useAppAuth() {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const login = (token: string, user: IUser) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ token: null, user: null });
  };

  return {
    token,
    user,
    login,
    logout,
  };
}
