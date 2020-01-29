const dirTree = require('directory-tree');

const VIDEO_FILE_LIST = 'video-file-list';
const JSON_FILE_LIST = 'json-file-list';
const VIDEO_FILE_COUNT = 'video-file-count';
const JSON_FILE_COUNT = 'json-file-count';

function selectVideoDirectory(e) {
  const fileList = e.target.files;

  if(!fileList[0]) return;

  const directoryPath = fileList[0].path;
  const fileTagContainer = document.getElementById(VIDEO_FILE_LIST);

  initializeFileExplorer(VIDEO_FILE_LIST);

  // TODO: Validate extensions
  const tree = dirTree(directoryPath, { extensions: /\.(gif|mp4|mov)$/ }, (item) => {
    createFileNameTag(item, fileTagContainer);
  });

  document.getElementById(VIDEO_FILE_COUNT).innerHTML = tree.children.length;
}

function selectJSONFileDirectory(e) {
  const fileList = e.target.files;

  if(!fileList[0]) return;

  const directoryPath = fileList[0].path;
  const fileTagContainer = document.getElementById(JSON_FILE_LIST);
  
  initializeFileExplorer(JSON_FILE_LIST);

  // TODO: Validate extensions
  const tree = dirTree(directoryPath, { extensions: /\.(json)$/ }, (item) => {
    createFileNameTag(item, fileTagContainer);
  });

  document.getElementById(JSON_FILE_COUNT).innerHTML = tree.children.length;
}

function initializeFileExplorer(tag) {
  const fileTree = document.getElementById(tag);

  while (fileTree.hasChildNodes()) {
    fileTree.removeChild(fileTree.firstChild);
  }
}

function createFileNameTag(item, container) {
  const fileTag = document.createElement('li');
  fileTag.innerHTML = item.name;
  fileTag.setAttribute('data-path', item.path);
  fileTag.setAttribute('onclick', 'onVideoSelected(event)');

  container.appendChild(fileTag);
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

  const fileTree = document.getElementById(JSON_FILE_LIST);

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

