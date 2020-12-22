/* eslint-disable */
export const { assign, entries, values, keys } = Object;

export const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    //eslint-disable-next-line
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '');

export const isArray = (a: any) => !!a && a.constructor === Array;
export const isObject = (a: any) => !!a && a.constructor === Object;
export const isEvent = (e: any) => !!e && e.constructor === Event;
export const isPromise = (e: any) => !!e && e.constructor.name === Promise;

export const isEmpty = (entry: any) => {
  if (isArray(entry)) {
    return entry.length > 0;
  }
  if (isObject(entry)) {
    return entries(entry).length > 0;
  }
};

export const hasValue = (value: unknown) => value !== undefined && value !== null && value !== '';

export const removeEmpty = obj =>
  Object.keys(obj)
    .filter(k => obj[k] != null) // Remove undef. and null.
    .reduce(
      (newObj, k) =>
        typeof obj[k] === 'object'
          ? { ...newObj, [k]: removeEmpty(obj[k]) } // Recurse.
          : { ...newObj, [k]: obj[k] }, // Copy value.
      {},
    );

export const mockAsync = (success, timeout, value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(value);
      } else {
        reject({ message: 'Error' });
      }
    }, timeout);
  });
};

export const deepClone = (obj: any) => {
  let clone, value: any, key: string;

  if (typeof obj !== "object" || obj === null) {
    return obj; // Return the value if obj is not an object
  }

  // Create an array or object to hold the values
  clone = Array.isArray(obj) ? [] : {};

  for (key in obj) {
    value = obj[key];

    // Recursively (deep) copy for nested objects, including arrays
    clone[key] = deepClone(value);
  }

  return clone;
};

export const mockAsyncValidator = (validator, success, timeout) => {
  const validationResponse = {};
  validationResponse[validator] = success ? true: null;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(validationResponse);
    }, timeout);
  });
};
