import videoControl from "../../helpers/video/video_control";

import mainViewContainer from "../../section/video/mainViewContainer";
import frameListContainer from "../../section/video/frameListContainer";
import overlayContainer from "../../section/overlayContainer";

import globalVideoData from "../../model/global/globalVideoData";
import globalFrame from "../../model/global/globalFrame";

const videoFilesContainer = document.getElementById("video-files-container");

videoFilesContainer.onclick = (event) => {
  if(event.target.className == "video-file") {
    mainViewContainer.initialize();
    frameListContainer.initialize();
    overlayContainer.initialize();

    const GlobalVideoData = new globalVideoData();
    GlobalVideoData.setPATH(event.target.dataset.path);
    GlobalVideoData.setTITLE(event.target.dataset.title);

    const GlobalFrame = new globalFrame();
    GlobalFrame.setAT(0);

    const playBackRate = 5;
    const video = videoControl.createVideoTag(event.target.dataset.path, playBackRate);

    mainViewContainer.setMainFrameRate(video);

    const fps = 5;
    videoControl.play(video, fps);
  }
}
