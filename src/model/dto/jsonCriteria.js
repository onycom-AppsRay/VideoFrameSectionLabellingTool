export default class {
  constructor() {
    this.type = "";
    this.text = "";
  }

  setType(type) {
    this.type = type;
    return this;
  }

  setText(text) {
    this.text = text;
    return text;
  }
}
