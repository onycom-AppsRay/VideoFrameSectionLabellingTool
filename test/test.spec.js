import fileExplorer from '../src/helpers/file_explorer';
import videoControl from '../src/helpers/video-control';

describe('test', () => {
  it('video control - capture', () => {
    const filePath = './sample2.mov';

    const result = videoControl.capture(filePath);

    console.log(result);
  })
})
