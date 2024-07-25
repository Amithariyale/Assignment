import { RequestMethods } from "../network/constants";
import Endpoints from "../network/endpoints";
import request from "../network/request";
import { setIsLoggedIn } from "./slice";
import { notification } from "antd";

export function signin(userData) {
  return async function (dispatch) {
    const { success, data } = await request({
      url: Endpoints.signup,
      method: RequestMethods.POST,
      data: userData,
    });

    if (success) {
      notification.success({
        message: "Sign In Successful",
      });
      return { success: true };
    } else {
      notification.error({
        message: "Sign In failed",
        description: typeof data === "string" ? data : "Try again...",
      });
      return { success: false };
    }
  };
}

export function login(userData) {
  return async function (dispatch) {
    const { success, data } = await request({
      url: Endpoints.login,
      method: RequestMethods.POST,
      data: userData,
    });

    if (success) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(data.data.userDetails)
      );
      notification.success({
        message: "Login Successful",
      });
      dispatch(setIsLoggedIn());
    } else {
      notification.error({
        message: "Sign In failed",
        description: typeof data === "string" ? data : "Try again...",
      });
    }
  };
}
