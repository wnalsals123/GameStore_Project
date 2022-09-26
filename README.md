# 리액트를 이용한 게임 판매 스토어
### Demo page : <a href="https://jmj-game-store.netlify.app/" target="_blank">JMJ-GameStore-Demo</a>[![Netlify Status](https://api.netlify.com/api/v1/badges/81384b25-f7dc-41af-be3d-9bc52a3d1439/deploy-status)](https://app.netlify.com/sites/jmj-game-store/deploys)

#### 1. 개발도구 : VSCode, Git
#### 2. 개발언어 : JavaScript ES6
#### 3. 라이브러리 : React(@18.2.0), react-router-v6(@6.3.0), react-cookie(@4.1.1)
#### 4. 프레임워크 : Tailwind CSS(@3.1.8)(with. Flowbite-carousel & Tailwind-scrollbar-hide)
#### 5. 웹 호스팅 : Netlify

***

### <코드 구조>

#### gamestore\src
* <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/index.js">*\index.js*</a> : 리액트 라우터 설정

#### gamestore\src\function - 페이지 기능 모음
* <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/function/AutoCompleteEmail.js">*\AutoCompleteEmail.js*</a> : 이메일 자동완성
* <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/function/AutoCompleteSearch.js">*\AutoCompleteSearch.js*</a> : 검색 자동완성
* <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/function/GameFilter.js">*\GameFilter.js*</a> : 게임 필터
* <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/function/PopDown.js">*\PopDown.js*</a> : 장바구니 담기 팝업
* <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/function/SearchResult.js">*\SearchResult.js*</a> : 검색 결과

#### gamestore\src\home - 메인 페이지
* \header - 헤더
  * <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/home/header/Header.js">*\Header.js*</a> : 검색창, 장바구니, 마이페이지, 카테고리 이동
* \main - 컨텐츠
  * <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/home/main/GameFlex.js">*\GameFlex.js*</a> : 페이지 컨포넌트 관리
  * <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/home/main/GameFlexBanner.js">*\GameFlexBanner.js*</a> : 페이지 배너
  * <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/home/main/GameFlexBox.js">*\GameFlexBox.js*</a> : 게임 리스트 뷰
  * <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/home/main/GameFlexHeader.js">*\GameFlexHeader.js*</a> : 게임, 카테고리, 정렬, 필터 설정
  * <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/home/main/GameFlexPagination.js">*\GameFlexPagination.js*</a> : 게임 리스트 페이지네이션
* \side - 사이드바
  * <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/home/side/SideBar.js">*\SideBar.js*</a> : 반응형 사이드바 
  * <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/home/side/SideBarContent.js">*\SideBarContent.js*</a> : 사이드바 컨텐츠

#### gamestore\src\json - 사이트 DB
* <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/json/CouponList.json">*\CouponList.json*</a> : 쿠폰데이터
* <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/json/GameList.json">*\GameList.json*</a> : 게임데이터
* <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/json/UserData.json">*\UserData.json*</a> : 유저데이터

#### gamestore\src\page - 서브 페이지
* \404
  * <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/page/404/NotFound.js">*\NotFound.js*</a> : 잘못된 페이지 리디렉션
  * <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/page/404/NotFoundGame.js">*\NotFoundGame.js*</a> : 존재하지 않는 게임 리디렉션
* <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/page/Cart.js">*\Cart.js*</a> : 장바구니 페이지
* <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/page/ItemDetail.js">*\ItemDetail.js*</a> : 게임 상세보기 페이지
* <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/page/Login.js">*\Login.js*</a> : 로그인 페이지
* <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/page/MyPage.js">*\MyPage.js*</a> : 마이 페이지
* <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/page/Payment.js">*\Payment.js*</a> : 결제 페이지
* <a href="https://github.com/wnalsals123/GameStore_Project/blob/master/gamestore/src/page/SignUp.js">*\SignUp.js*</a> : 회원가입 페이지

***

### <기능 구현>
#### 0. 공통사항
* 반응형 웹, 서버 및 DB → 배열 함수와 localStorage로 대체

#### 1. 메인 페이지 - <a href="https://jmj-game-store.netlify.app/">Link</a>
* 검색창, 필터링, 게임 리스트 뷰, 애니메이션 동작, 각 페이지로 이동

#### 2. 로그인 페이지 - <a href="https://jmj-game-store.netlify.app/login">Link</a>
* 로그인 시 세션 쿠키 및 사용자 정보 생성

#### 3. 회원가입 페이지 - <a href="https://jmj-game-store.netlify.app/signup">Link</a>
* 사용자 입력 값 추적 및 확인

#### 4. 장바구니 페이지 - <a href="https://jmj-game-store.netlify.app/cart">Link</a>
* 장바구니 데이터 불러오기, 결제 페이지에 결제정보 전달

#### 5. 상세보기 페이지 - <a href="https://jmj-game-store.netlify.app/games/%EB%A9%94%EC%9D%B4%ED%94%8C%EC%8A%A4%ED%86%A0%EB%A6%AC">Link</a>
* 파라미터로 게임 정보 불러오기, 장바구니에 담기, 유저 리뷰 및 좋아요

#### 6. 마이 페이지 - <a href="https://jmj-game-store.netlify.app/mypage">Link</a>
* 내 정보, 구매 내역, 리뷰 관리, 쿠폰함 및 쿠폰 등록

#### 7. 결제 페이지 - <a href="https://jmj-game-store.netlify.app/payment">Link</a> 
* 장바구니에서 결제정보 획득, 완료 후 유저 데이터 갱신, 잘못된 접근 시 리디렉션