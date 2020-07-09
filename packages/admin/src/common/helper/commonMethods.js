export const storageEngine = {
  // TODO: whether to need null check
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },
  get(key, convertToJson = true) {
    const item = localStorage.getItem(key);
    let returnValue = item;
    if (convertToJson) {
      try {
        returnValue = JSON.parse(item);
      } catch (error) {}
    }
    return returnValue;
  },
  unset(key) {
    if (!Array.isArray(key)) key = [key];
    key.forEach((k) => {
      localStorage.removeItem(k);
    });
  },
};

export const debounce = (fn, delay) => {
  let timerId;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
};

export const uuId = (length = 10) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const isEmpty = (a) => (a ? Object.keys(a || {}).length === 0 : true);

export const deepClone = (input) => JSON.parse(JSON.stringify(input || {}));

export const createUUID = () =>
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  `_${Math.random().toString(36).substr(2, 9)}`;
