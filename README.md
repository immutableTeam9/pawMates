# PawMates(포미츠)

내일배움캠프 6기 9조 뉴스피드프로젝트 23.06.26 - 23.07.02 불멸의 9조

## 팀원

| 팀원   | 스택         | 팀원구분 | 깃허브                                          | 블로그                                            |
| ------ | ------------ | -------- | ----------------------------------------------- | ------------------------------------------------- |
| 이지은 | `프론트엔드` | `팀장`   | [JellyBear97](https://github.com/JellyBear97)   | [Jelly_Bear](https://jelly-lee.tistory.com/)      |
| 윤수민 | `프론트엔드` | `팀원`     | [suminute](https://github.com/suminute)         | [숨숨의 블로그](https://sum-til.tistory.com/)     |
| 임지영 | `프론트엔드` | `팀원`     | [jiapril11](https://github.com/jiapril11)       | [recording](https://recordonlyforme.tistory.com/) |
| 정봉호 | `프론트엔드` | `팀원`     | [CodeNoob4089](https://github.com/CodeNoob4089) | [코린이 코딩일지](https://codenoob2.tistory.com/) |

## 목차

- [1. 프로젝트 소개](#1-프로젝트-소개)
- [2. 프로젝트 시연 영상](#2-프로젝트-시연-영상)
- [3. 프로젝트 주소](#3-프로젝트-주소)
- [4. 프로젝트 S.A](#4-프로젝트-sa)
- [5. 기술스택](#5-기술스택)
- [6. 사용한 라이브러리](#6-사용한-라이브러리)
- [7. API Table](#7-api-table)
- [8. 구현기능](#8-구현-기능)

## 1. 프로젝트 소개

- 프로젝트 제목 :
  - PawMates(포미츠)
- 프로젝트 간단 설명 :
  - 프로젝트 기획 이유 : 1인 가구가 늘어남에 따라 반려 동물을 키우는 사람들이 증가하는 가운데 반려 동물을 키우는 사람들의 커뮤니티가 부족한 듯 하여 시작하게 된 프로젝트
  - 프로젝트 핵심 목적 : 반려 동물 관련 정보 공유
  - 프로젝트 기능 :
    - 집사들과 함께하는 당신 곁의 커뮤니티
    - 집사들이 서로 함께하는 반려 동물 커뮤니티

## 2. 프로젝트 시연 영상

[유튜브 링크](https://youtu.be/za1CM4f379U)

## 3. 프로젝트 주소

[vercel 배포 링크](https://paw-mates-team9.vercel.app/)

## 4. 프로젝트 S.A

[notion 링크](https://creative-poison-1a7.notion.site/9-_-S-A-b0075315de3a44cdb06ac11bc734ed62?pvs=4)

## 5. 기술스택

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/Creact React App-09D3AC?style=for-the-badge&logo=CreactReactApp&logoColor=white"><img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"><img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">

## 7. API Table

`GET` `POST` `PUT` `DELETE`
| Number | Method | URL | Description | Request | Response |
| ------ | ------ | ------------------------------------- | --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1 | `GET` | /api/home | 글 목록 가져오기(메인페이지) | | 전체피드 |
| 2 | `GET` | /api/mypage | 마이페이지 | {userId : userId, 게시한 글} | |
| 3 | `GET` | /api/post/`<post_id>` | 특정 피드 가져오기 | {게시물 정보, 게시물에 달린 댓글} | |
| 4 | `GET` | 보류 | 검색 | query={검색어} | 검색 결과 |
| 5 | `POST` | /api/login | 로그인 | { userId : userId, password : password} | |
| 6 | `POST` | /api/signup | 회원가입 | { id : id, password : password} | |
| 7 | `POST` | /api/post | 새 피드 작성 | {userId : userId, img: img, title : title, body:body, hashTag:hashTag} | |
| 8 | `PUT` | /api/profile/`<user_id>` | 프로필 수정 | {userId : userId, postId : postId, img: img, title : title, body:body, hashTag:hashTag,} | |
| 9 | `PUT` | /api/post/`<post_id>` | 피드 수정 | {userId : userId, postId : postId, img: img, title : title, body:body, hashTag:hashTag,} | |
| 10 | `PUT` | /api/post/`<post_id>` | 코멘트 수정 | {userId : userId, postId : postId (필요한가), commentId : commentId, comment : comment} | |
| 11 | `DELETE` | /api/post/`<post_id>` | 피드 삭제 | {postId : postId} | |
| 12 | `DELETE` | /api/post/<comment_id> | 코멘트 삭제 | {userId : userId, postId : postId, commentId : commentId, comment : comment} | |

## 8. 구현 기능

### 1) 홈 화면

<img width="700" alt="스크린샷 2023-07-03 오전 1 24 42" src="https://github.com/immutableTeam9/pawMates/assets/124346085/f032ad33-c26e-4993-8a17-a5cbf181fdf3">

### 2) 회원가입 화면/로그인화면

<img width="700" alt="스크린샷 2023-07-03 오전 1 34 41" src="https://github.com/immutableTeam9/pawMates/assets/124346085/fc904109-2dec-4abe-866d-6a8f935a873d"><img width="700" alt="스크린샷 2023-07-03 오전 1 28 24" src="https://github.com/immutableTeam9/pawMates/assets/124346085/77ed75ac-1b68-4aca-81d4-7aa575a9ee06">

### 3) 게시글 작성

<img width="700" alt="스크린샷 2023-07-03 오전 1 31 02" src="https://github.com/immutableTeam9/pawMates/assets/124346085/704b3307-f7a8-4128-9791-4a48fee0c80f">

### 4) 상세게시물&댓글 작성

<img width="700" alt="스크린샷 2023-07-03 오전 1 31 35" src="https://github.com/immutableTeam9/pawMates/assets/124346085/5d577952-2415-4248-9fc2-170e152ff615"><img width="1030" alt="스크린샷 2023-07-03 오전 2 26 13" src="https://github.com/immutableTeam9/pawMates/assets/124346085/0283a35e-d910-4aed-9a97-9f594120a304">

### 5) 게시물 수정

<img width="700" alt="스크린샷 2023-07-03 오전 1 32 23" src="https://github.com/immutableTeam9/pawMates/assets/124346085/5615acc8-b89b-447c-89c1-34fccfe6a027">

### 6) 프로필 수정

<img width="700" alt="스크린샷 2023-07-03 오전 1 35 14" src="https://github.com/immutableTeam9/pawMates/assets/124346085/9b55437b-5315-4e8c-87b6-39eb24de89f9">

### 7) 마이페이지에서 내가 작성한 게시물 모아보기

<img width="700" alt="스크린샷 2023-07-03 오전 1 40 52" src="https://github.com/immutableTeam9/pawMates/assets/124346085/3be76719-9081-4666-951f-dcab2ff57f2b">
