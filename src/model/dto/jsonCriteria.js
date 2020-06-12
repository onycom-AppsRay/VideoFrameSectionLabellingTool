export default class {
  constructor() {
    this.type = "";
    this.text = "";
  }

  setType(type) {
    if(typeof type == "string") {
      this.type = (type.toString().charCodeAt(0) - 64);
    } else {
      this.type = type;
    }
    return this;
  }

  setText(text) {
    this.text = text;
    return text;
  }
}
