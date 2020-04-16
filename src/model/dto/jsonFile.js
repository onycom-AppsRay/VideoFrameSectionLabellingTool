import jsonCriteriaDTO from "./jsonCriteria";

export default class {
  constructor(jsonContent = "") {
    this.name = (!jsonContent ? "" : jsonContent.name);
    this.createAt = (!jsonContent ? new Date().toLocaleString(): jsonContent.createAt);
    this.count = (!jsonContent ? 0 : jsonContent.count);
    this.criterias = (!jsonContent ? [] : jsonContent.criterias);
    this.videos = (!jsonContent ? [] : jsonContent.videos);
  };

  getName() {
    return this.name;
  }

  getCreateAt() {
    return this.createAt;
  }

  getCount() {
    return this.count;
  }

  getCriterias() {
    return this.criterias;
  }

  getVideos() {
    return this.videos;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setCreateAt() {
    this.createAt = new Date().toLocaleString();
    return this;
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

  setVideos(videos) {
    this.videos = Array.prototype.concat(this.videos, videos);
    return this;
  }

  setCount() {
    this.count++;

    if(this.count != this.videos.length) {
      this.count = this.videos.length;
    }
  }
}
