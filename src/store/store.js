import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slice/login/loginSlice";

export const store = configureStore({
  reducer: {
    loginInfo: loginReducer,
  },
});
