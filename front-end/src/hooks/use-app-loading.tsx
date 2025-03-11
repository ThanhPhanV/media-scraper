import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  setLoading,
  stopLoading as coreStopLoading,
} from "../redux/reducers/app-reducer";

export function useAppLoading() {
  const { isLoading } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const startLoading = () => {
    dispatch(setLoading());
  };
  const stopLoading = () => {
    dispatch(coreStopLoading());
  };
  return {
    isLoading,
    startLoading,
    stopLoading,
  };
}
