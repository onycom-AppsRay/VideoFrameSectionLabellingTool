import jsonCriteriaDTO from "./jsonCriteria";

export default class {
  constructor(jsonContent = "") {
    this.name = (!jsonContent ? "" : jsonContent.name);
    this.path = (!jsonContent ? "" : jsonContent.path);
    this.createAt = (!jsonContent ? new Date().toLocaleString() : jsonContent.createAt);
    this.count = (!jsonContent ? 0 : jsonContent.count);
    this.criterias = (!jsonContent ? [] : jsonContent.criterias);
    this.videos = (!jsonContent ? [] : jsonContent.videos);
  };

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  getPath() {
    return this.path;
  }

  setPath(path) {
    this.path = path;
    return this;
  }

  getCreateAt() {
    return this.createAt;
  }

  setCreateAt() {
    this.createAt = new Date().toLocaleString();
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
