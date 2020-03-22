import dirTree from "directory-tree";
import fs from "fs";

const getFileList = (path) => {
  let result = [];

  dirTree(path, { extensions: /\.(mp4|mov)$/ }, (item) => {
    if (validateFile(item)) {
      result.push(item);
    } else {
      return;
    }
  })

  return result;
}

/**
 * @param {*} file - 'dirTree()' return 'file' Object (name, type, size, path ..)
 * @returns {Boolean}
 */
const validateFile = (file) => {
  const regex = /^\./;

  const name = file.name;
  const type = file.type;

  if(regex.exec(name) != null) {
    return false;
  }

  if(type == 'file') {
    return true;
  }
}

export default {
  getFileList
}
