export default class {
  constructor() {
    this.name = "";
    this.createAt = new Date().toLocaleString();
    this.count = 0;
    this.criteria = [];
    this.videos = [];
  };

  setName(name) {
    this.name = name;
    return this;
  }

  setCreateAt(date) {
    this.createAt = date;
    return this;
  }

  setCount(count) {
    this.count = count;
    return this;
  }

  setCriteria(criteria) {
    this.criteria = criteria;
    return this;
  }

  setVideos(videos) {
    this.videos = Array.prototype.concat(this.videos, videos);
    return this;
  }

  makeJSON() {
    return this;
  }
}
