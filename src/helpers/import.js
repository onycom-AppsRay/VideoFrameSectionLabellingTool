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

    if (link.href.match("about.html")) {
      document.querySelector("body").appendChild(clone)
    }

    if(link.href.match("open_directory.html")) {
      document.querySelector("#open-directory-page").appendChild(clone);
    }

    if(link.href.match("open_file.html")) {
      document.querySelector("#open-file-page").appendChild(clone);
    }

    if(link.href.match("form_criteria2.html")) {
      document.querySelector("#form-criteria-page").appendChild(clone);
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
  })
};

(async () => {
  await section();
  await element();
})();
