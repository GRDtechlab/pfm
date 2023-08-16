import { useSelector } from "react-redux";
import { selectCurrentUser } from "./auth-slice";
import { useMemo } from "react";

export const useGetCurrentUser = () => {
  const user = useSelector(selectCurrentUser);

  // return useMemo(() => ({ user }), [user]);
  return user;
};
