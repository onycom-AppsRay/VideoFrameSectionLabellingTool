import dirTree from "directory-tree";

const getFileList = (path) => {
  let result = [];

  dirTree(path, { exclude: /^\./, extensions: /\.(mp4|mov)$/ }, (item) => {
    result.push(item);
  })

  return result;
}

export default {
  getFileList
}
