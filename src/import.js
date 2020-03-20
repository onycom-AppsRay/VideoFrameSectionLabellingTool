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

    if (link.href.match("result_list_container.html")) {
      document.querySelector(`div[id="result-list-container"]`).appendChild(clone);
    }

    if (link.href.match("section_selection_criteria_container.html")) {
      document.querySelector(`div[id="section-selection-criteria-container"]`).appendChild(clone);
    }

    if (link.href.match("progress_bar_container.html")) {
      document.querySelector(`div[id="progress-bar-container"]`).appendChild(clone);
    }
  })
};

(async () => {
  await section();
  await element();
})();
