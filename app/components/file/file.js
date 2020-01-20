const dirTree = require('directory-tree');

function onDirectorySelect(e) {
  const directoryPath = e.target.files[0].path;

  const tree = dirTree(directoryPath);

  dirSearch(tree);
}

function dirSearch (tree) {
  const fileTree = document.getElementById('file-tree');
  
  tree.children.forEach(element => {
    if(element.type == 'file') {
      const file = document.createElement('a');
      const filePath = document.createTextNode(element.name);
      file.setAttribute('href', '#');
      file.setAttribute('onclick', 'onVideoSelected(event)');
      file.setAttribute('id', element.path);

      const p = document.createElement('br');

      file.appendChild(filePath);
      fileTree.appendChild(file);
      fileTree.appendChild(p);
    }
  });
}