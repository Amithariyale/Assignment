import { ApiStatus, RequestMethods } from "../network/constants";
import Endpoints from "../network/endpoints";
import request from "../network/request";
import { setApiStatus, setIsLoggedIn } from "./slice";
import { notification } from "antd"; // Importing notification module from antd for showing notifications

// Thunk function for user sign-in
export function signin(userData) {
  return async function (dispatch) {
    dispatch(setApiStatus({ apiStatus: ApiStatus.pending }));
    // Sending sign-in request to the server
    const { success, data } = await request({
      url: Endpoints.signup, // Endpoint for sign-up
      method: RequestMethods.POST, // HTTP method POST
      data: userData, // User data to be sent in the request body
    });

    // Handling response
    if (success) {
      // If the request is successful, show a success notification
      notification.success({
        message: "Sign In Successful",
      });
      dispatch(setApiStatus({ apiStatus: ApiStatus.success }));
    } else {
      // If the request fails, show an error notification
      notification.error({
        message: "Sign In failed",
        description: typeof data === "string" ? data : "Try again...", // Show error message or a default message
      });
      dispatch(setApiStatus({ apiStatus: ApiStatus.error }));
    }

    // Returning the success status for further use
    return { success };
  };
}

// Thunk function for user login
export function login(userData) {
  return async function (dispatch) {
    dispatch(setApiStatus({ apiStatus: ApiStatus.pending }));

    // Sending login request to the server
    const { success, data } = await request({
      url: Endpoints.login, // Endpoint for login
      method: RequestMethods.POST, // HTTP method POST
      data: userData, // User data to be sent in the request body
    });

    // Handling response
    if (success) {
      // If the request is successful, store the token and user details in localStorage
      localStorage.setItem("token", data.data.token);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(data.data.userDetails)
      );

      // Show a success notification
      notification.success({
        message: "Login Successful",
      });

      // Dispatch the action to update the logged-in state
      dispatch(setIsLoggedIn());
      dispatch(setApiStatus({ apiStatus: ApiStatus.success }));
    } else {
      // If the request fails, show an error notification
      notification.error({
        message: "Sign In failed",
        description: typeof data === "string" ? data : "Try again...", // Show error message or a default message
      });
      dispatch(setApiStatus({ apiStatus: ApiStatus.error }));
    }

    // Returning the success status for further use
    return { success };
  };
}
