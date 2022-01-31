import { isNullish } from "./typeGuards";
import { SUCCESS_STATUS } from "../constants/httpStatusConstants";

export function isSuccess(source) {
  if (isNullish(source) || isNullish(source.status)) {
    return false;
  }

  return source.status === SUCCESS_STATUS;
}
