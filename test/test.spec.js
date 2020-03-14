import fileExplorer from '../src/helpers/file_explorer';

describe('test', () => {
  it('test', () => {
    let result = fileExplorer.getFileList('/Volumes/Samsung_T5/onycom/[TestForte.AI] 로딩시간측정/[로딩시간측정] 데이터/[데이터] 화면영상녹화본/[화면영상녹화본] Original/[Original] 2020-02-10');

    console.log(result);
  })
})
