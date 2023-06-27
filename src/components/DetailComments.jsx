import React from 'react';
import styled from 'styled-components';

function DetailComments() {
  return (
    <DetailCommentsWrapper>
      {/* header부분 */}
      <div>comments list</div>
      {/* 댓글 listing */}
      <CommentUl>
        {/* 댓글 하나 */}
        <CommentLi>
          <div>
            <img src="" alt="userProfileimage" />
          </div>
          <div>
            <p>userId</p>
            <p>날짜</p>
            <p>내용</p>
          </div>
        </CommentLi>
      </CommentUl>
      <div>❤︎ 좋아요</div>
      <form>
        <input type="text" placeholder="댓글 달기..." />
        <button>게시</button>
      </form>
    </DetailCommentsWrapper>
  );
}

export default DetailComments;

const DetailCommentsWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CommentUl = styled.ul`
  padding: 0;
  margin: 10px 0;
`;

const CommentLi = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  border: 1px solid black;
  display: flex;
`;
