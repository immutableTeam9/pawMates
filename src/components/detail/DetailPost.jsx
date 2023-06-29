// import React from 'react';
// import styled from 'styled-components';

import { styled } from 'styled-components';

function DetailPost({ users, post }) {
  let writerImage = users.filter((user) => {
    return user.userId === post.userId;
  })[0].userImage;
  writerImage !== '' || (writerImage = 'https://cdn-icons-png.flaticon.com/512/552/552721.png');
  return (
    <DetailPostWrapper>
      <div>
        <img
          src={post.imgURL}
          alt="detailPostImg"
          style={{
            width: '20%',
            height: '30%'
          }}
        />
      </div>
      <UserInfoArea>
        <UserImage src={writerImage} alt="" />
        &nbsp;<span>{post.nickName}</span>
      </UserInfoArea>
      <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p>hashTags</p>
      </div>
    </DetailPostWrapper>
  );
}

export default DetailPost;

const DetailPostWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const UserInfoArea = styled.div`
  border: 1px solid black;
`;

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
`;
