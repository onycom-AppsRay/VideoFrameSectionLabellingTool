import jsonCriteriaDTO from "./jsonCriteria";
import path from "path";

let instance = null;

export default class {
  constructor(jsonContent = "") {
    if (instance) return instance;

    this.name = (!jsonContent ? "" : jsonContent.name);
    this.path = (!jsonContent ? "" : jsonContent.path);
    this.createAt = (!jsonContent ? new Date().toLocaleString() : jsonContent.createAt);
    this.count = (!jsonContent ? 0 : jsonContent.count);
    this.criterias = (!jsonContent ? [] : jsonContent.criterias);
    this.videos = (!jsonContent ? [] : jsonContent.videos);

    instance = this;
  };

  init() {
    this.name = "";
    this.path = "";
    this.createAt = "";
    this.count = 0;
    this.criterias = [];
    this.videos = [];
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  getDirPath() {
    return this.path;
  }

  setPath(dirPath, fileName = "") {
    this.path = path.join(dirPath, fileName);
    return this;
  }

  getCreateAt() {
    return this.createAt;
  }

  setCreateAt(createAt = "") {
    if(createAt == "") {
      this.createAt = new Date().toLocaleString();
    } else {
      this.createAt = createAt;
    }

    return this;
  }

  getCount() {
    return this.count;
  }

  setCount() {
    this.count++;

    if (this.count != this.videos.length) {
      this.count = this.videos.length;
    }
  }

  getCriterias() {
    return this.criterias;
  }

  setCriterias(criterias) {
    Array.prototype.forEach.call(criterias, (criteria) => {
      const JSONCriteria = new jsonCriteriaDTO();

      JSONCriteria.setType(criteria.type)
        .setText(criteria.text);

      this.criterias.push(JSONCriteria);
    })

    return this;
  }

  getVideos() {
    return this.videos;
  }

  setVideos(videos) {
    this.videos = Array.prototype.concat(this.videos, videos);
    return this;
  }

  updateVideo(index, video) {
    this.videos.splice(index, 1, video);
  }
}
