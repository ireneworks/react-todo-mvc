import { SUCCESS_STATUS } from "../constants/httpStatusConstants";
import { isNullish } from "./typeGuards";

export function isSuccess(target) {
  if (isNullish(target) || isNullish(target.status)) {
    return false;
  }
  return target.status === SUCCESS_STATUS;
}
