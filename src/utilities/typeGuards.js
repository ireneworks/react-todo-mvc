export function isUndefined(target) {
  return target === undefined;
}

export function isNull(target) {
  return target === null;
}

export function isNullish(target) {
  return isUndefined(target) || isNull(target);
}

export function isEmpty(target) {
  if (isNullish(target)) {
    return true;
  }
  if (typeof target === "number") {
    return target === 0;
  }

  if (typeof target === "string") {
    return target === 0;
  }

  if (Array.isArray(target)) {
    return target.length === 0;
  }

  return Object.keys(target).length === 0;
}
