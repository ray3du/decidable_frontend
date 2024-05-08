import { message, notification } from "antd";
import axios from "axios";

const instance = axios.create({
  mode: "cors",
  baseURL: "https://b713-41-90-70-202.ngrok-free.app",
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("decidable_token") ||
      localStorage.getItem("refresh_token");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    // config.headers["Access-Control-Allow-Origin"] = "*";
    // config.headers["Access-Control-Allow-Credentials"] = true;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedError) {
      // Error notification
      notification["error"]({
        message: "System Error",
        description: "An unexpected error occurred.",
      });
    } else {
      const { response } = error;
      const { ...errorObject } = response;
      switch (errorObject.status) {
        case 401:
          if (
            errorObject.data &&
            errorObject.data.message != null &&
            errorObject.data.message === "Access is denied"
          ) {
            message.error("Access is denied");
            localStorage.removeItem("access_token");
            localStorage.removeItem("user_email");
          } else {
            message.error(
              errorObject.data?.error_description ||
                errorObject?.data?.detail ||
                errorObject?.data?.message
            );
            localStorage.removeItem("access_token");
            localStorage.removeItem("user_email");
          }
          break;
        case 403:
          message.error("Unauthorized Access");
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_email");
          break;
        case 409:
          // Error Notification
          notification["warning"]({
            message: "Server Error",
            description:
              errorObject.data?.message ||
              errorObject.data?.error_description ||
              errorObject?.data?.details,
          });
          break;
        default:
          // Error Notification
          notification["warning"]({
            message: "Server Message",
            description:
              errorObject.data?.message ||
              errorObject.data?.error_description ||
              errorObject?.data?.details,
          });
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
