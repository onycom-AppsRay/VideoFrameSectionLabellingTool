# video-labelling-tool
비디오 파일에 대해서 특정 구간에 대한 레이블링을 돕는 툴.

<br/>

## Summary
비디오 파일을 초당 5장씩 캡쳐한 프레임 리스트로 보여준다.

사용자는 비디오 파일 상에서 원하는 레이블링 기준을 통해서, 범위에 대한 레이블링을 가능하게 한다.

레이블링 데이터는 JSON 파일로 저장이 되며, 프레임 개수와 동일한 길이의 배열에 레이블링 결과가 표기 된다.

<br/>

## Tutorial

#### (1) Select Video Directory
비디오 파일이 있는 폴더를 선택한다.

<kbd>
  <img src="https://user-images.githubusercontent.com/20623970/81248648-ccc15c00-9057-11ea-8734-331150377705.gif" width="700">
</kbd>


#### (2) Open JSON Directory
레이블링 데이터를 저장 할 JSON 파일을 생성 혹은 기존에 작업하던, JSON 파일을 불러온다.

a. JSON 파일 생성

<kbd>
  <img src="https://user-images.githubusercontent.com/20623970/81248795-22960400-9058-11ea-8c42-421f5c049ab2.gif" width="700">
</kbd>

b. 생성 한 JSON 파일 불러오기

<kbd>
  <img src="https://user-images.githubusercontent.com/20623970/81248931-74d72500-9058-11ea-904c-daecf442b7d4.gif" width="700">
</kbd>

#### (3) Write Criteria
JSON 파일을 생성할 경우, 레이블링 기준을 입력한다.
<kbd>
  <img src="https://user-images.githubusercontent.com/20623970/81249064-b8319380-9058-11ea-8332-78071a840bcf.gif" width="700">
</kbd>

#### (4) Labelling
레이블링 작업을 진행한다.

<kbd>
  <img src="https://user-images.githubusercontent.com/20623970/81255108-ce931b80-9067-11ea-85a0-a6b36e2edbc0.gif" width="700">
</kbd>

## Issue
> brew unlink tesseract