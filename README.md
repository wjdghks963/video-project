# 영상 플랫폼 라이브러리 제작

- 라이브러리 사용하지 않고 제작
- video tag 에 useRef 활용 해서 기능 개발
- useCallback , useMemo 사용해서 랜더링 최적화
- 아래의 UI에 있는 아이콘은 무료 아이콘이나 텍스트로 표기하셔도 괜찮습니다
- next.js 에서 정상적으로 작동해야함
- styled-components 으로 작성
- typescript으로 작성
  - `npx create-next-app --typescript` 새로운 프로젝트에서 시작
- `[http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4](http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4)` 영상 소스

## 기능 상세

- [x] 컨트롤바 on/off

  - 영상 영역에서 마우스 이동시 컨트롤바 보이도록 구현
  - 영상 영역에서 마우스가 사라질시 컨트롤바 제거
  - 영상 영역에서 3초 동안 마우스가 아무 반응이 없을시 컨트롤바 제거

- [x] 크롬에서 m3u8 확장자 재생 되도록 기능 구현
  - hls.js 라이브러리를 사용해서 구현함
- [x] 재생/ 정지 기능
- [x] 볼륨 조절 기능
- [x] 전체화면 ,축소 기능
- [x] 영상 전체길이 표기
- [x] 현재 보고있는 영상 시간 표기
- [x] 프로그레스바 클릭시 해당 시간으로 넘기기
  - 넘기는 도중 영상이 load 중이라면 로딩UI 표시
- [x] 광고 기능 - 특정 시간경과시 광고영상으로 교체되고 광고가 끝날 시 다시 원래 영상보던 시간으로 돌아오기
- [x] 볼륨 음소거 on/off기능
- [x] 볼륨 아이콘 hover 시 볼륨 조절 기능 표시
- [x] keyDown event 이용해서 키보드 이벤트 구현
  - 왼쪽 방향키 event - 영상 시간 -5초
  - 오른쪽 방향키 event - 영상 시간 +5초
  - 스페이스바 evnet - 영상 재생/정지 toggle
- [x] 영상 속도 조절
