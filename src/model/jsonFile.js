export default class {
  constructor(name = "", createAt = new Date(), count = 0, criteria = {}, videos = []) {
    this.name = name;
    this.createAt = createAt;
    this.count = count;
    this.criteria = criteria;
    this.videos = videos;
  };
}
