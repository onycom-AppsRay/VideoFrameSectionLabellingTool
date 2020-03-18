// Import and add each page to the DOM
// 'link' rel 속성 값은 'import' 이어야 하고, 'template' 태그 class 명은 'task-template' 이어야 한다.
const links = document.querySelectorAll(`link[rel="import"]`);

const section = async () => {
  Array.prototype.forEach.call(links, (link) => {
    let template = link.import.querySelector(".task-template")

    let clone = document.importNode(template.content, true)

    if (link.href.match("header.html")) {
      document.querySelector("header").appendChild(clone)
    }

    if (link.href.match("content.html")) {
      document.querySelector(".content").appendChild(clone);
    }

    if (link.href.match("footer.html")) {
      document.querySelector("footer").appendChild(clone)
    }
  })
};

const element = async () => {
  Array.prototype.forEach.call(links, (link) => {
    let element = link.import.querySelector(".task-template");

    let clone = document.importNode(element.content, true)

    if (link.href.match("frame_index_container.html")) {
      document.querySelector(`div[id="frame-index-container"]`).appendChild(clone);
    }
  })
};

(async () => {
  await section();
  await element();
})();
