export default class {
  constructor(type = [], start = 0, end = 0) {
    this.type = type;
    this.start = start;
    this.end = end;
  }

  setType(type) {
    if(type.length > 1) {
      const alphabetList = type.split(", ");
      
      let numberList = [];
      Array.prototype.forEach.call(alphabetList, (alphabet) => {
        numberList.push(alphabet.toString().charCodeAt(0) - 64);
      });

      this.type = numberList;
    } else {
      this.type = (type.toString().charCodeAt(0) - 64);
    }

    return this;
  }

  setStart(start) {
    this.start = Number.parseInt(start);
    return this;
  }

  setEnd(end) {
    this.end = Number.parseInt(end);
    return this;
  }
}