const links = document.querySelectorAll('link[rel="import"]')

// Import and add each page to the DOM
Array.prototype.forEach.call(links, (link) => {
  let template = link.import.querySelector('.task-template')

  let clone = document.importNode(template.content, true)

  if (link.href.match('header.html')) {
    document.querySelector('header').appendChild(clone)
  }

  if (link.href.match('content.html')) {
    document.querySelector('.content').appendChild(clone)
  }

  if (link.href.match('footer.html')) {
    document.querySelector('footer').appendChild(clone)
  }
})
