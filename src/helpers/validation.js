import validator from "validate.js";

const isValidJSON = (json) => {
  try {
    JSON.parse(json);

    return true;
  } catch (err) {
    return false;
  }
}

const validationValue = (json) => {
  if (!validator.isString(json.name)) {
    console.log(validator.isString(json.name));
    return false;
  }

  if (!validator.isString(json.createAt)) {
    console.log(validator.isString(json.createAt));
    return false;
  };

  if (!validator.isNumber(json.count)) {
    console.log(validator.isNumber(json.count));
    return false;
  };

  if (!validator.isObject(json.criteria)) {
    console.log(validator.isObject(json.criteria));
    return false;
  };

  if (!validator.isObject(json.videos)) {
    console.log(validator.isObject(json.videos));
    return false;
  };

  return true;
}

export default {
  isValidJSON,
  validationValue
}
