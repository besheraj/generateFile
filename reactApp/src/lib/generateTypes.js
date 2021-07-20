const random = require("simple-random-number-generator");

export const params1 = {
  min: 100,
  max: 10000000,
  integer: true,
};

export const params2 = {
  min: 5,
  max: 10,
  integer: true,
};

export const getRandomString = (length) => {
  const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
};

export const getRandomalphanumerics = (length) => {
  const randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
};

export const getRandomDecimal = (length) => {
  const result = Math.random().toFixed(length);
  return result;
};

export const getRandomInteger = () => {
  const result = random(params1);
  return result;
};

export function generateRandomObjects() {
  let random = Math.floor(Math.random() * 4) + 1
  if (random === 1) {
    getRandomDecimal(params2);
  }
  if (random === 2) {
    getRandomalphanumerics(params2);
  }
  if (random === 3) {
    getRandomString(params2);
  }
  if (random === 4) {
    getRandomInteger(params1);
  }
}
