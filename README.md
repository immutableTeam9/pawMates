# PawMates(포미츠)

내일배움캠프 6기 9조 뉴스피드프로젝트 23.06.26 - 23.06.30 불멸의 9조

## 팀원

| 팀원   | 스택         | 팀원구분 | 깃허브                                          | 블로그                                       |
| ------ | ------------ | -------- | ----------------------------------------------- | -------------------------------------------- |
| 이지은 | `프론트엔드` | `팀장`   | [JellyBear97](https://github.com/JellyBear97)   | [Jelly_Bear](https://jelly-lee.tistory.com/) |
| 윤수민 | `프론트엔드` | 팀원     | [suminute](https://github.com/suminute)         | [](https://sum-til.tistory.com/)             |
| 임지영 | `프론트엔드` | 팀원     | [jiapril11](https://github.com/jiapril11)       | [](https://recordonlyforme.tistory.com/)     |
| 정봉호 | `프론트엔드` | 팀원     | [CodeNoob4089](https://github.com/CodeNoob4089) | [](https://codenoob2.tistory.com/)           |

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

## 2. 프로젝트 시연 영상

[유튜브 링크]()

## 3. 프로젝트 주소

[배포 일시 중지]

## 4. 프로젝트 S.A

[]()

## 5. 기술스택

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

## 7. API Table

| N.                   | Method | URL                   | Description             | Request                           | Response  |
| -------------------- | ------ | --------------------- | ----------------------- | --------------------------------- | --------- | --------- |
|                      | `GET`  | /api/home             | 메인(전체 피드 listing) |                                   | 전체 피드 |
|                      | `GET`  | /api/mypage           | 마이페이지              | {userId : userId,                 |
| 게시한 글}           | /token |
|                      | `GET`  | /api/post/`<post_id>` | 피드 상세보기           | {게시물 정보, 게시물에 달린 댓글} | /token    |
|                      | `GET`  | -                     | 검색(보류)              | query={검색어}                    | /token    | 검색 결과 |
|                      | `POST` | /api/login            | 로그인                  | { userId : userId,                |
| password : password} | /token |
|                      | `POST` | /api/signup           | 회원가입                | { id : id,                        |
| password : password} | /token |
|                      | `POST` | /api/post             | 새 피드작성             | {userId : userId,                 |

img: img,
title : title,
body:body,
hashTag:hashTag} | /token |
| | `PUT` | /api/profile/`<user_id>` | 프로필 수정 | {userId : userId} | |
| | `PUT` | /api/post/`<post_id>` | 피드 수정 | {userId : userId,
postId : postId,
img: img,
title : title,
body:body,
hashTag:hashTag,} | |
| | `PUT` | /api/post/`<post_id>` | 댓글 수정 | {userId : userId,
📌 postId : postId (필요한가),
commentId : commentId,
comment : comment} | |
| | `DELETE` | /api/post/`<post_id>` | 피드 삭제 | {userId : userId,
postId : postId,
commentId : commentId,
comment : comment} | |
| | `DELETE` | /api/post/`<comment_id>` | 댓글 삭제 |{userId : userId} | |

## 8. 구현 기능

### 1) 홈 화면 및 로그인 화면

### 2) 카테고리 화면 및 카테고리 등록 화면

### 3) 카테고리별 카드 리스트 화면 및 등록 화면
