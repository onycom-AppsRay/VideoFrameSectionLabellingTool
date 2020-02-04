// TODO(yhpark): Validate 'string'
function createFile(path, name, extension, data) {
  if(validate.isEmpty(path)) {
    alert(`Set the path to save the 'json' file.`);
    return;
  }

  const file = name.concat('.', extension);

  fs.writeFile(path.concat('/', file), data, function (err) {
    if (err) {
      throw err;
    } else if (confirm(`Create an ${file}  file.`)) {
      alert(`Created file ${file}`);
      return;
    } else {
      console.error('File creation error.');
      return;
    };
  });
};

// TODO(yhpark): file.js classification
function selectVideoDirectory(e) {
    // TODO(yhpark): Initialize video list
  VIDEO_LIST = '';

  const fileList = e.target.files;

  console.log(fileList);

  if(!fileList[0]) return;

  const directoryPath = fileList[0].path;
  const directoryName = fileList[0].name;
  const fileTagContainer = document.getElementById(VIDEO_FILE_LIST);

  // Initialize 'JsonFile'
  SelectedLoadingSectionJsonFile = new JSONFile(directoryName);

  initializeFileExplorer(VIDEO_FILE_LIST);

  // TODO: Validate extensions
  const tree = dirTree(directoryPath, { extensions: /\.(gif|mp4|mov)$/ }, (item) => {
    createFileNameTag(item, fileTagContainer);
  });

  VIDEO_LIST = tree;

  document.getElementById(VIDEO_FILE_COUNT).innerHTML = tree.children.length;
}

function selectJSONFileDirectory(e) {
  const fileList = e.target.files;

  if(!fileList[0]) return;

  const directoryPath = fileList[0].path;

  JSON_DIRECTORY_PATH = directoryPath;

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

  container.appendChild(fileTag);
}

function onSuccess() {
  if (!JSON_DIRECTORY_PATH) {
    alert('JSON 파일을 저장할 폴더를 선택하세요.');
    document.getElementById('open-json-directory').focus();
    return;
  }

  if (!VIDEO_LIST) {
    alert('비디오 폴더를 선택하세요.');
    document.getElementById('open-video-directory').focus();
    return;
  }

  // 0) 파일 이름 가져오기
  const videoFileName = document.getElementById('file-name').innerHTML;
  const jsonFileName = videoFileName.split('.')[0];

  // 1) 선택된 구간에 해당하는 값 불러오기
  let data = {
    jsonFileName: SELECTED_FRAME_LIST
  }

  // 1-1) 비디오 당 한 파일을 떨구지 말고, 메모리에 저장해 두었다가, 디렉토리 당 한 파일로 떨구기
  const SelectedLoading = new LoadingInfo(jsonFileName, SELECTED_FRAME_LIST);

  SelectedLoadingSectionJsonFile.setLoadingData(SelectedLoading.getLoadingInfo()); // 'JsonFile.js' 에 전역으로 선언해 둠.

  // 4) 버튼 레이아웃 초기화
  deleteAllSelectedFrameIndexInputTag();
  
  // 5) 다음 비디오 파일로 이동
  VIDEO_LIST.children.forEach((video, index, array) => {
    if(video.name == videoFileName){
      const nextVideo = VIDEO_LIST.children[index + 1];

      renderVideo(nextVideo.path, nextVideo.name, FRAME_LIST);

      // 6) 완료된 파일 처리
      const fileList = document.getElementById('video-file-list').childNodes;

      fileList.forEach((elem) => {
        if (elem.dataset.path == video.path) {
          elem.style.textDecoration = 'line-through';

          return;
        }
      });

      return;
    }
  });
}

