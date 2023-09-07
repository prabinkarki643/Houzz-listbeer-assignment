import apiUrl from "./apiUrl";
import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { AppAxiosSuccessResponseI } from "./types";

export const appAxiosInstance = axios.create({
  baseURL: `${apiUrl.BASE_URL}`,
});

export async function AppWebRequest<T = any>(
  config: AxiosRequestConfig<any>
): Promise<AppAxiosSuccessResponseI<T>> {
  config.paramsSerializer = {
    serialize: (params) => qs.stringify(params),
  };
  return appAxiosInstance(config)
    .then((response) => {
      const resPayload: AppAxiosSuccessResponseI<T> = {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
      return Promise.resolve(resPayload);
    })
    .catch((error) => {
      var responseError = {};
      if (error.response) {
        responseError = {
          ...error.response?.data,
          ...getProperErrorMessageFromError(error.response?.data),
          status: error.response.status,
        };
      } else if (error.request) {
        responseError = {
          ...error,
          message: "Can not made connection to the server",
        };
      } else {
        responseError = {
          ...error,
          message: "Unexpected error occured!",
        };
      }
      return Promise.reject(responseError);
    });
}

function getProperErrorMessageFromError(error: {
  message: string | Array<string>;
  details: object & { errors: any[] };
  name: string;
}) {
  const errorObj: {
    message: string;
    originalErrorDetails: object;
    errorData: any[];
  } = {
    message: "",
    originalErrorDetails: error.details,
    errorData: Array.isArray(error?.details?.errors)
      ? error?.details?.errors
      : [],
  };
  try {
    if (typeof error == "string") {
      errorObj.message = error;
    } else if (errorObj.errorData.length <= 1) {
      errorObj.message =
        typeof error.message == "string" ? error.message : error.message?.[0];
    } else if (errorObj.errorData.length > 1) {
      errorObj.message = `${error.message}, ${errorObj?.errorData
        .map((f) => f.message)
        .join(", ")}`;
    } else {
      errorObj.message =
        (typeof error.message == "string"
          ? error.message
          : error.message?.[0]) ||
        error.name ||
        "Unexpected error occured";
    }
  } catch (er: any) {
    errorObj.message = er.message || "Unexpected error occured";
  }

  return errorObj;
}
