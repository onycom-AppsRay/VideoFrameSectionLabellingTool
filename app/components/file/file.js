const dirTree = require('directory-tree');

const SELECTED_FILE_TAG = 'file-list';
const COMPLITED_FILE_TAG = 'completed-file-list';

function onDirectorySelect(e) {
  const directoryPath = e.target.files[0].path;

  const tree = dirTree(directoryPath);

  dirSearch(tree);
}

function dirSearch(tree) {
  const fileTree = document.getElementById(SELECTED_FILE_TAG);

  tree.children.forEach(element => {
    if (element.type == 'file') {
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

/**
 * file name 확인 해서 '완료된 파일' 부분에 보여주기
 * 1. p tag 에 파일 이름 존재하는지 확인
 * 2. 불러온 파일 리스트를 전역으로 하나 관리해서, 완료된 파일은 내리거나 색 처리
 * 3. '완료된 파일'을 선택 시, 다시 볼 수 있도록
 */
function onSuccess() {
  const fileName = document.getElementById('file-name').innerText;

  // file-name innerText 존재 유무 확인 절차 구현할 것
  console.log(fileName);

  const fileTree = document.getElementById(COMPLITED_FILE_TAG);

  const file = document.createElement('a');
  const filePath = document.createTextNode(fileName);
  file.setAttribute('href', '#');
  file.setAttribute('onclick', 'onVideoSelected(event)');
  // file.setAttribute('id', element.path);

  const p = document.createElement('br');

  file.appendChild(filePath);
  fileTree.appendChild(file);
  fileTree.appendChild(p);
}

