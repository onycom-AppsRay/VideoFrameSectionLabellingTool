// TODO(yhpark): Validate 'string'
function writeFile(path, data) {
  if (validate.isEmpty(path)) {
    alert(`Set the path to save the 'json' file.`);
    return;
  }

  if (validate.isEmpty(data)) {
    alert(`선택한 로딩 구간이 없는 경우 파일에 표시되지 않습니다.`);
  }

  fs.writeFile(path, data, (err) => {
    if (err) {
      throw err;
    } else {
      alert('파일에 쓰기 완료');
    }
  });
};

function confirmJSONFile(path) {
  const readBuffer = fs.readFileSync(path);

  deleteFileNameTag(document.getElementById('json-file-list'));

  if (readBuffer.length > 0) {

    const jsonData = JSON.parse(readBuffer);
    const jsonDataList = Object.entries(jsonData.loadingData);
    const jsonDataCount = Object.entries(jsonData.loadingData).length;

    const tempJSONDataSet = new Set();

    // 이전의 데이터가 있었으면, 표시하고 객체에 저장 시켜서 이어 붙일 준비.
    jsonDataList.forEach(([key, value]) => {
      const fileName = value.name;
      const fileData = value.data;
      
      tempJSONDataSet.add(fileName);

      const previousLoadingInfo = new LoadingInfo(fileName, fileData);
      SelectedLoadingSectionJsonFile.pushLoadingData(previousLoadingInfo.getLoadingInfo());

      createFileNameTag(fileName, '', document.getElementById('json-file-list'));
    })

    // 만약, 비디오 리스트가 로딩 되었다면 비교해서 취소선 처리하기
    if(!validate.isEmpty(VIDEO_LIST)) {
      let isCompletedFile = false;

      VIDEO_LIST.children.forEach((video) => {
        const videoName = video.name.split('.')[0];
        if(tempJSONDataSet.has(videoName)) {
          isCompletedFile = true;
          const videoList = document.getElementById('video-file-list').childNodes;
    
          videoList.forEach((elem) => {
            if (elem.dataset.path == video.path) {
              elem.style.textDecoration = 'line-through';
    
              return;
            }
          });
        }
      })
      
      if(!isCompletedFile) {
        alert(`JSON 파일과 비디오 폴더 간의 일치하는 항목이 없습니다.`);
      }
    }

    document.getElementById('json-file-count').innerHTML = jsonDataCount;
  } else {
    alert('빈 파일을 로딩 하셨습니다.');
  }
}

// TODO(yhpark): file.js classification
function selectVideoDirectory(e) {
  // TODO(yhpark): Initialize video list
  VIDEO_LIST = '';

  const fileList = e.target.files;

  if (!fileList[0]) return;

  const directoryPath = fileList[0].path;
  const directoryName = fileList[0].name;
  const fileTagContainer = document.getElementById(VIDEO_FILE_LIST);

  initializeFileExplorer(VIDEO_FILE_LIST);

  // TODO: Validate extensions
  const tree = dirTree(directoryPath, { extensions: /\.(gif|mp4|mov)$/ }, (item) => {
    createFileNameTag(item.name, item.path, fileTagContainer);
  });

  VIDEO_LIST = tree;

  document.getElementById(VIDEO_FILE_COUNT).innerHTML = tree.children.length;
}

function selectJSONFile(e) {
  if(validate.isEmpty(VIDEO_LIST)) {
    alert('비디오 폴더를 먼저 선택하세요.');
    return;
  }
  
  const fileList = e.target.files;

  const filePath = fileList[0].path;
  const fileName = fileList[0].name;

  JSON_DIRECTORY_PATH = filePath;

  // Initialize 'JsonFile'
  SelectedLoadingSectionJsonFile = new JSONFile(fileName);

  document.getElementById('json-file-path').innerHTML = fileName;

  confirmJSONFile(filePath);
}

function initializeFileExplorer(tag) {
  const fileTree = document.getElementById(tag);

  while (fileTree.hasChildNodes()) {
    fileTree.removeChild(fileTree.firstChild);
  }
}

function createFileNameTag(name, path, container) {
  const fileTag = document.createElement('li');
  fileTag.innerHTML = name;
  fileTag.dataset.name = name;
  fileTag.setAttribute('data-path', path);

  container.appendChild(fileTag);
}

function deleteFileNameTag(container) {
  if (container.hasChildNodes()) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
}

function onSuccess() {
  if (!VIDEO_LIST) {
    alert('비디오 폴더를 선택하세요.');
    document.getElementById('open-video-directory').focus();
    return;
  }

  if (!SelectedLoadingSectionJsonFile) {
    alert('저장 할 JSON 파일을 선택하세요.');
    document.getElementById('open-json-file').focus();
    return;
  }

  // 0) 파일 이름 가져오기
  const videoFileName = document.getElementById('file-name').innerHTML;
  const dataName = videoFileName.split('.')[0];

  // 1) 선택된 구간에 해당하는 값 불러오기

  // 1-1) 비디오 당 한 파일을 떨구지 말고, 메모리에 저장해 두었다가, 디렉토리 당 한 파일로 떨구기
  const SelectedLoading = new LoadingInfo(dataName, SELECTED_FRAME_LIST);

  SelectedLoadingSectionJsonFile.pushLoadingData(SelectedLoading.getLoadingInfo()); // 'JsonFile.js' 에 전역으로 선언해 둠.

  // 4) 버튼 레이아웃 초기화
  deleteAllSelectedFrameIndexInputTag();

  // 5) 다음 비디오 파일로 이동
  VIDEO_LIST.children.forEach((video, index) => {
    if (video.name == videoFileName) {
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