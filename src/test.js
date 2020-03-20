import { remote } from "electron";
import videoControl from "./helpers/video_control";
import imageControl from "./helpers/image_control";

let GLOBAL_FRAME = remote.getGlobal("sharedObject").FRAME;

const globalVariable = () => {
  console.log("GLOBAL_FRAME_LENGTH: ", GLOBAL_FRAME["LENGTH"]);
  console.log("GLOBAL_FRAME_AT: ", GLOBAL_FRAME["AT"]);

  console.log(`remote.getGlobal("sharedObject").FRAME: `, remote.getGlobal("sharedObject").FRAME);
  console.log(`input[name="criteria"]:checked:`, document.querySelector(`input[name="criteria"]:checked`).value);
}

const jsonFileData = () => {
  return {
    name: "",
    createAt: new Date(),
    count: 0,
    criteria: [
      {
        key: "",
        value: "",
        content: "",
      }
    ],
    labellingData: [
      {
        name: "",
        value: "",
      }
    ]
  }
}

(() => {
  const path = "../sample2.mp4";

  // test
  // console.log(JSON.stringify(jsonFileData(), 2, " "));

  const playbackRate = 10;
  const video = videoControl.createVideoTag(path, playbackRate);
  console.log(video.duration);

  // prograss bar
  document.getElementById("progress-bar-container").hidden = false;

  videoControl.playVideo(video, 5, imageDataList => {
    GLOBAL_FRAME["LENGTH"] = imageDataList.length;

    imageDataList.forEach((imageData, index) => {
      const dataUrl = imageControl.imageDataToImage(imageData, 0.1);
      imageControl.setImage(dataUrl, index, "100%", "");
    })
  }, (result, flag) => {
    if (flag) {
      document.getElementById("progress-bar-container").hidden = true;
      document.getElementById("progress-bar").style.width = "0%";
    } else {
      document.getElementById("progress-bar").style.width = `${(result / 26) * 100}%`;
    }

  })
})();

/**
 * playVideo(video, 5, (result) => {

    console.log("FRAME_COUNT: ", remote.getGlobal("sharedObject").FRAME_COUNT);

    result.forEach((value, index) => {
      const canvas = document.createElement("canvas");
      canvas.width = value.width;
      canvas.height = value.height;

      const ctx = canvas.getContext("2d");
      ctx.putImageData(value, 0, 0);

      drawStroked(ctx, index, (canvas.width / 2), (canvas.height / 2));
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.putImageData(frame, 0, 0);

      const img = document.createElement("img");
      img.src = canvas.toDataURL("image/jpeg", 0.1);
      img.className = "frame";
      img.style.width = "100%";
      img.addEventListener("mouseenter", (event) => {
        mainViewImage.src = event.target.src;
        event.target.style.border = "5px solid red";
      });
      img.addEventListener("mouseleave", (event) => {
        event.target.style.border = "";
      });
      img.addEventListener("click", (event) => {
        mainViewImage.src = event.target.src;
      });

      if (index == 0) {
        mainViewImage.src = img.src;
      }

      frameListContainer.appendChild(img);

      console.log(index);
    })
  });
 */
