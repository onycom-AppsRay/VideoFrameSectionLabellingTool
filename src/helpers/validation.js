import validator from "validate.js";

const isJSON = (json) => {
  try {
    JSON.parse(json);

    return true;
  } catch (err) {
    return false;
  }
}

const checkJSONValueType = (json) => {
  if (!validator.isString(json.name)) {
    return false;
  }

  if (!validator.isString(json.createAt)) {
    return false;
  };

  if (!validator.isNumber(json.count)) {
    return false;
  };

  if (!validator.isObject(json.criteria)) {
    return false;
  };

  if (!validator.isObject(json.videos)) {
    return false;
  };

  return true;
}

export default {
  isJSON,
  checkJSONValueType
}
