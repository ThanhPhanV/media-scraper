import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { IUser } from "../interfaces/user.interface";
import { setAuth } from "../redux/reducers/auth-reducer";
import { useNavigate } from "react-router-dom";

export function useAppAuth() {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const login = (token: string, user: IUser) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(setAuth({ token, user }));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setAuth({ token: null, user: null }));
    nav("/sign-in");
  };

  return {
    token,
    user,
    login,
    logout,
  };
}
