
const initialize = () => {
  const progressBarContainer = document.getElementById("progress-bar-container");
  const progressBar = document.getElementById("progress-bar");

  progressBarContainer.hidden = "";
  progressBar.style.width = "0%";
}

const showProgress = () => {
  /*
  const video = document.getElementById("hidden-video");
  const progressBarContainer = document.getElementById("progress-bar-container");
  const progressBar = document.getElementById("progress-bar");
  const videoFilesContainer = document.getElementById("video-files-container");

  videoFilesContainer.style.pointerEvents = "none";

  video.addEventListener("timeupdate", () => {
    const duration = video.duration;
    const current = video.currentTime;

    if(duration == current) {
      progressBarContainer.hidden = true;
      videoFilesContainer.style.pointerEvents = "initial";
    }

    const rate = (100 * (current / duration));

    progressBar.style.width = `${rate}%`;
  });
  */
}

export default {
  initialize,
  showProgress
}
