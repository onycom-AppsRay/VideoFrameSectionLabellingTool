export default class {
  constructor(path, playbackRate) {
    this.video = document.createElement("video");

    this.video.style.width = "100%";
    this.video.style.height = "100%";
    this.video.src = path;
    this.video.muted = "muted";
    this.video.playbackRate = playbackRate;
    this.video.poster = "";
  }

  play() {
    this.video.play();
  }

  playTime() {
    this.video.ontimeupdate = () => {
      console.log(this.video.currentTime);
    };
  }
}
