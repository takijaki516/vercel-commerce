import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createUrl(
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;
  return `${pathname}${queryString}`;
}

// NOTE: for server action result;
export enum ResultCode {
  InvalidCredentials = "INVALID_CREDENTIALS",
  InvalidSubmission = "INVALID_SUBMISSION",
  UserAlreadyExists = "USER_ALREADY_EXISTS",
  UnknownError = "UNKNOWN_ERROR",
  UserCreated = "USER_CREATED",
  UserLoggedIn = "USER_LOGGED_IN",
  CollectionCreated = "COLLECTION_CREATED",
  CollectionAlreadyExists = "COLLECTION_ALREADY_EXISTS",
  CollectionFormInvalid = "COLLECTION_FORM_INVALID",
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return "Invalid Credentials";
    case ResultCode.InvalidSubmission:
      return "Invalid Submission";
    case ResultCode.UserAlreadyExists:
      return "User Already Exists";
    case ResultCode.UnknownError:
      return "Something went wrong. Unknown Error";
    case ResultCode.UserCreated:
      return "User Created";
    case ResultCode.UserLoggedIn:
      return "User Logged In";
    case ResultCode.CollectionCreated:
      return "Collection Created";
    case ResultCode.CollectionAlreadyExists:
      return "Collection Already Exists";
    case ResultCode.CollectionFormInvalid:
      return "Collection Form Invalid";
  }
};

// REVIEW:
export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
